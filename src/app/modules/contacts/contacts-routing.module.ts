import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { NewComponent } from "./components/new/new.component";
import { UpdateComponent } from "./components/update/update.component";

const routes: Route[] = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'new',
    component: NewComponent
  },
  {
    path: 'detail/:id',
    component: UpdateComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
