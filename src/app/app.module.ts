import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { ProductAlertsComponent } from "./product-alerts/product-alerts.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ListComponent } from "./list/list.component";
import { CharacterDetailComponent } from "./character-detail/character-detail.component";
import { CharacterService } from "./character.service";
import { MessagesComponent } from "./messages/messages.component";
import { MessageService } from "./message.service";
import { InMemoryDataService } from "./in-memory-data.service";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),
    RouterModule.forRoot([
      { path: "", component: ListComponent },
      { path: "products/:productId", component: ProductDetailsComponent }
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    ListComponent,
    CharacterDetailComponent,
    MessagesComponent
  ],
  bootstrap: [AppComponent],
  providers: [CharacterService, MessageService, InMemoryDataService]
})
export class AppModule {}
