import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      title: [''],
      body: ['']
    });
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];
    if (this.itemId) {
      this.dataService.getItem(this.itemId).subscribe(data => {
        this.itemForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.itemId) {
      this.dataService.updateItem(this.itemId, this.itemForm.value).subscribe(() => {
        this.router.navigate(['/items']);
      });
    } else {
      this.dataService.addItem(this.itemForm.value).subscribe(() => {
        this.router.navigate(['/items']);
      });
    }
  }
}
