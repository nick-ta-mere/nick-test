import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { MessageService } from "./message.service";

import { CHARACTERS } from "./characters";
import { Character } from "./character";
@Injectable()
export class CharacterService {
  constructor(private messageService: MessageService) {}

  getCharacters(): Observable<Character[]> {
    this.messageService.add("HeroService: fetched heroes");
    return of(CHARACTERS);
  }
}
