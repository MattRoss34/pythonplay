from django.conf.urls import url

from . import views

app_name = 'notes'
urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^(?P<note_id>[0-9]+)/$', views.detail, name='detail'),
	url(r'^(?P<note_id>[0-9]+)/save/$', views.save, name='save'),
	url(r'^(?P<note_id>[0-9]+)/delete/$', views.delete, name='delete'),
	url(r'^add/$', views.new, name='new'),
]