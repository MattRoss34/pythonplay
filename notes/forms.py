from django import forms

class NoteForm(forms.Form):
	title = forms.CharField(label='Title', max_length=50)

class UpdateForm(forms.Form):
	title = forms.CharField(label='Title', max_length=50)
	text = forms.CharField(label='Text', max_length=3000)

class SaveForm(forms.Form):
	text = forms.CharField(label='Text', max_length=3000)
