import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'note-creator',
    styles: [`
    .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
    `],
    template: `
    <div class="note-creator shadow-2" [ngStyle]="{'background-color': newNote.color }">
      <form class="row" (submit)="onNoteCreated()">
        <input
          type="text"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          (focus)="toggleFullForm(true)"
          [(ngModel)]="newNote.value"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
        >
        <div class="actions col-xs-12 row between-xs" *ngIf="fullForm">
        <div class="col-xs-3">
            <color-picker
            [colors]="colors"
            (selected)="onColorSelect($event)">
            </color-picker>
        </div>
          <button
            type="submit"
            class="btn-light"
           >
            Done
          </button>
        </div>
      </form>
    <!-- <pre>{{ newNote | json }}</pre> this prints the output to markup  -->
    </div>
    `
})

export class NoteCreator {
    @Output() createNote = new EventEmitter();

    colors: string[] = ['red', 'white', 'green', 'yellow', 'lightblue', 'lightgreen'];

    newNote = {
        title: '',
        value: '',
        color: 'white'
    };

    fullForm: boolean = false;

    onNoteCreated() {
        const {title, value, color } = this.newNote;

        if (title && value) {
            this.createNote.next({title, value, color})
        }

        // this resets values in form
        this.reset();

        // this resets inputs to be hidden on submit
        this.toggleFullForm(false);
    }

    reset() {
        this.newNote = {
            title: '',
            value: '',
            color: 'white'
        };
    }

    toggleFullForm(value: boolean) {
       this.fullForm = value; 
    }

    onColorSelect(color: string) {
      this.newNote.color = color;
    }
    
}

