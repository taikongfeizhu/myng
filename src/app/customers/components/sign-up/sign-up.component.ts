import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customers.service';
import { Customer, Profile } from '../../customers.model';
import { Router } from '@angular/router';

interface ServiceResult {
  success: boolean;
  message: string;
}


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  public customer: Customer ;
  public agree: boolean;

  constructor(private customerService: CustomerService, private router: Router) {
    this.customer = {
      profile: {
        email: ''
      },
      id: 0,
      name: '',
      phone: '',
      password: '',
    };
    this.agree = false;
  }

  signUp(): void{
    if (!this.agree) {
      return;
    }
    const responseObservable = this.customerService.addCustomer(this.customer);
    responseObservable.subscribe((res: ServiceResult ) => {
      if (res.success){
        this.router.navigate(['/customers/log-in', { phone: this.customer.phone }]);
      }else{
        console.error('error');
      }
    });
  }

  ngOnInit(): void {
  }

}
