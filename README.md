1. 設定好venv
2. pip install django djangorestframwork
3. 建立project : django-admin startproject **project_name**
4. 在crawler_realestate底下 建立api app:  django-admin startapp api
5. Add api app to project setting
6. 在 setting.py 裡面 : INSTALLED_APPS + 'api.apps.ApiConfig'


.\venv\django-react\Scripts\activate.bat


啟動 Server

第一次 or 任何有change model 或 database 都要 run 的指令
python .\manage.py makemigrations
python .\manage.py migrate# music_share_app
