import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-form',
  imports: [RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {
  //Save form values in the angular version of a ref?
  // Add cancel function that empty the form values and redirects back to the book list
  // Add submit function
  //Disable submit button if the form values are empty
}
