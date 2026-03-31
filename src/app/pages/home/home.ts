import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Notes } from '../../core/services/notes/notes';
import { ToastrService } from 'ngx-toastr';
import { Inotes } from '../../shared/interfaces/inotes';
import { SearchPipe } from '../../shared/pipes/search-pipe';

@Component({
  selector: 'app-home',
  imports: [ ReactiveFormsModule, SearchPipe, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly notesService = inject(Notes)
  private readonly toastrService = inject(ToastrService);
  notesData : Inotes[]=[];
  noteId!: string;
  word: string = '';

    addNotesForm: FormGroup = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    })
    editNotesForm: FormGroup = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    })

    ngOnInit(): void {
      this.getAllUserNotes()
    }

    getAllUserNotes():void{
       this.notesService.getUserNotes().subscribe({
        next:(res)=>{
          this.notesData=res.notes
        },error: (err)=>{
          console.log(err);
          if(err.error.msg === 'not notes found'){
            this.notesData=[]
          }
        }
      })
    }

    submitAddNoteForm(): void{      
      this.notesService.addNotes(this.addNotesForm.value).subscribe({
        next: (res)=>{
          this.addNotesForm.reset();
          this.toastrService.success(res.msg, 'Notify Team');
          this.getAllUserNotes()
        },
        error: (err)=>{
          console.log(err);
          
        }
      })
    }

    setEditNoteForm(id:string,note:any):void{
      this.noteId = id;
      this.editNotesForm.patchValue({
        title: note.title,
        content: note.content
      })
    }

    submitEditNoteForm():void{
      this.notesService.updateNotes(this.noteId,this.editNotesForm.value).subscribe({
        next: (res)=>{
          this.editNotesForm.reset();
          this.toastrService.success('This Note Updated Successfully', 'Notify Team');
          this.getAllUserNotes()
        }, error: (err)=>{
          console.log(err);
        }
      })
    }

    deleteUserNote(id:string): void{
      this.noteId = id;
    }

    confirmDeleteNote(): void{
      this.notesService.deleteNotes(this.noteId).subscribe({
        next: ()=>{
          this.toastrService.success('This Note Deleted Successfully', 'Notify Team');
          this.getAllUserNotes();
        }, error: (err)=>{
          console.log(err);
        }
      })
    }
}
