import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./message.service";

import { Character } from "./character";
@Injectable()
export class CharacterService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  private charactersUrl = "api/characters";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.charactersUrl).pipe(
      tap(_ => console.log("fetched characters")),
      catchError(this.handleError<Character[]>("getCharacters", []))
    );
  }

  // getCharacter(id: number): Observable<Character> {
  //   const url = `${this.charactersUrl}/${id}`;
  //   let characters = this.http.get<Character>(url).pipe(
  //     tap(_ => console.log(`fetched Character id=${id}`)),
  //     catchError(this.handleError<Character>(`getCharacter id=${id}`))
  //   );

  //   return characters;
  // }

  updateCharacter(character: Character): Observable<any> {
    return this.http.put(this.charactersUrl, character.serialize(), this.httpOptions).pipe(
      tap(_ => console.log(`updated Character id=${character.id}`)),
      catchError(this.handleError<any>("updateCharacter"))
    );
  }

  addCharacter(character: Character): Observable<Character> {
    return this.http
      .post<Character>(this.charactersUrl, character.serialize(), this.httpOptions)
      .pipe(
        tap((newCharacter: Character) =>
          this.log(`added "${newCharacter.name}" with id=${newCharacter.id}`)
        ),
        catchError(this.handleError<Character>("addCharacter"))
      );
  }

  private log(message: string) {
    this.messageService.add(`CharacterService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
