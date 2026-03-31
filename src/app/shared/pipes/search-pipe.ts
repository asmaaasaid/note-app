import { Pipe, PipeTransform } from '@angular/core';
import { Inotes } from '../interfaces/inotes';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allNotes: Inotes[], term: string): Inotes[] {
    return allNotes.filter( (item)=> item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())  );
  }

}
