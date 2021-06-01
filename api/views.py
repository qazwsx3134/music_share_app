from abc import abstractproperty
from django.db.models import query
from django.db.models.query_utils import InvalidQuery
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
# Create your views here.

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        room_code = request.GET.get(self.lookup_url_kwarg)

        if room_code != None:
            room = Room.objects.filter(room_code=room_code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room not found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoom(APIView):
    def post(self, request, format=None):
        lookup_url_kwarg = 'code'

        #如果client 不在session裡 創一個session
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        room_code = request.data.get(lookup_url_kwarg)
        
        # request.data.get 會 return none 如果找不到 kwarg
        if room_code != None:
            room_result = Room.objects.filter(room_code=room_code)
            
            if len(room_result) > 0 :
                room = room_result[0]

                # 記住 user 在哪一個 room_code
                self.request.session['room_code']= room_code
                return Response({'message': 'Room Joined'}, status=status.HTTP_200_OK)
            
            # 找不到房間
            return Response({'Bad Request': 'Invalid room_code'}, status=status.HTTP_400_BAD_REQUEST)
        
        # 找不到param
        return Response({'Bad Request': 'Invalid param'}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        
        #如果client 不在session裡 創一個session
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        #把request.data 用CreateRoomSerializer解析 之後 看request是否合法
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            
            #如果同一個host已經創過 Room這個object 那麼就更新原本的房間(一人只能創一個房間)
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                #更新房間
                
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])

                self.request.session['room_code']= room.room_code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                #創造新的房間

                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()

                self.request.session['room_code']= room.room_code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

            #
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class UserInRoom(APIView):
    def get(self, request, format=None):
        #如果client 不在session裡 創一個session
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        data = {
            'room_code': self.request.session.get('room_code')
        }

        return JsonResponse(data, status=status.HTTP_200_OK)


class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            code = self.request.session.pop('room_code')

            host_id = self.request.session.session_key
            # 如果是 host 離開房間 需要把 room 一起關掉
            host_room = Room.objects.filter(host=host_id)
            if len(host_room) > 0:
                room = host_room[0]
                room.delete()
        
        return Response({'message': 'succes'}, status=status.HTTP_200_OK)
