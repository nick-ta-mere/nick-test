import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductAlertsComponent } from "./product-alerts/product-alerts.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ListComponent } from "./list/list.component";
import { AddCharacterComponent } from "./add-character/add-character.component";
import { AddCharacter2Component } from "./add-character2/add-character2.component";
import { CharacterDetailComponent } from "./character-detail/character-detail.component";
import { CharacterService } from "./character.service";
import { MessagesComponent } from "./messages/messages.component";
import { MessageService } from "./message.service";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: ListComponent },
      { path: "products/:productId", component: ProductDetailsComponent }
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    ListComponent,
    AddCharacterComponent,
    AddCharacter2Component,
    CharacterDetailComponent,
    MessagesComponent
  ],
  bootstrap: [AppComponent],
  providers: [CharacterService, MessageService]
})
export class AppModule {}

