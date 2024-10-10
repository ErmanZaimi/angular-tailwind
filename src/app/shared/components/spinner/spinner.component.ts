import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div class="w-10 h-10 border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  `
})
export class SpinnerComponent {}
