import datetime
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic

from .models import Note
from .forms import SaveForm, NoteForm

def index(request):
	template = 'notes/index.html'
	notes_list = Note.objects.order_by('mod_date')
	note = None
	context = {
		'notes_list' : notes_list,
		'note' : note
	}

	return render(request, template, context)

def detail(request, note_id):
	template = 'notes/index.html'
	notes_list = Note.objects.order_by('mod_date')
	note = None
	if note_id:
		note = get_object_or_404(Note, pk=note_id)
	context = {
		'notes_list' : notes_list,
		'note' : note
	}

	return render(request, template, context)

def new(request):
	form = NoteForm(request.POST)
	if form.is_valid():
		aTitle = form.cleaned_data['title']
		note = Note(title=aTitle, text='', mod_date=datetime.datetime.now())
		note.save()
		return HttpResponseRedirect('/notes/'+str(note.id))
	return HttpResponseRedirect('/notes')

def save(request, note_id):
	form = SaveForm(request.POST)
	if form.is_valid():
		note = get_object_or_404(Note, pk=note_id)
		note.text = form.cleaned_data['text']
		note.mod_date = datetime.datetime.now()
		note.save()
		return HttpResponseRedirect('/notes/'+str(note.id))
	return HttpResponseRedirect('/notes')

def delete(request, note_id):
	if note_id:
		note = get_object_or_404(Note, pk=note_id)
		note.delete()
	return HttpResponseRedirect('/notes')

class DetailView(generic.DetailView):
	model = Note
	template_name = 'notes/detail.html'


class ResultsView(generic.DetailView):
	model = Note
	template_name = 'notes/results.html'
