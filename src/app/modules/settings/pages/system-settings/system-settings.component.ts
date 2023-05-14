import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SystemService } from 'src/app/core/services/system.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
})
export class SystemSettingsComponent {
  systemForm?: FormGroup;
  file?: File;
  icon_preview: any = 'assets/icons/CICT Logo.png';
  constructor(private systemService: SystemService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initSystemColor();
    this.systemService.getSystemSettings$().subscribe({
      next: (resp: any) => {
        if (resp) {
          console.log(resp);
          // this.icon_preview = resp.data.icon;
          this.initForm(resp);
        }
      },
      error: (err) => console.debug(err),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (!this.systemForm) return;
    if (!file) {
      return alert('No file selected');
    } else if (file.length > env.MAX_FILE_SIZE) {
      return alert(
        'File size is too large, max accepted file size is: ' +
          env.MAX_FILE_SIZE / 1000
      );
    }
    this.file = file;
    const reader = new FileReader();
    reader.onload = (e) =>
      (this.icon_preview = reader.result ?? 'assets/icons/CICT Logo.png');
    reader.readAsDataURL(file);
  }
  onSubmit() {
    if (!this.systemForm) return;
    console.log(this.systemForm.value);
    // eslint-disable-next-line prefer-const
    const formData: FormData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries(this.systemForm.value).forEach(([key, value]: any[]) => {
      console.log(key, value, !!value && value != 'null');
      if (!!value && value != 'null' && value !== null) {
        formData.append(key, value);
      }
    });
    if (this.file && this.systemForm.contains('icon')) {
      formData.set('icon', this.file);
    } else {
      formData.delete('icon');
    }
    this.systemService.updateSystem$(formData).subscribe({
      next: (resp) => {
        console.debug(resp);
        window.location.reload();
      },
      error: (err) => console.debug(err),
    });
  }

  initForm(data: any) {
    this.systemForm = this.fb.group({
      name: [data.data.name, []],
      about: [data.data.about, []],
      icon: [null, []],
      color: [data.data.color, []],
    });
  }

  initSystemColor() {
    const color = this.systemService.color;

    this.replaceClassName('bg-primary-', `bg-${color}-`);
    this.replaceClassName('text-primary-', `text-${color}-`);
    this.replaceClassName('border-primary-', `border-${color}-`);
    this.replaceClassName('ring-primary-', `ring-${color}-`);
    this.replaceClassName('hover:bg-primary-', `hover:bg-${color}-`);
    // this.replaceClassName('button-colored', `button-${color}`);
    this.replaceClassName('tab-link', `tab-link-${color}`);
    this.replaceClassName(
      'peer-checked:bg-primary-',
      `peer-checked:bg-${color}-`
    );
    this.replaceClassName(
      'peer-checked:border-primary-',
      `peer-checked:border-${color}-`
    );
  }

  private replaceClassName(prefix: string, replacement: string) {
    const elements = document.querySelectorAll(`[class*="${prefix}"]`);
    for (let i = 0; i < elements.length; i++) {
      const classList = elements[i].classList;
      for (let j = 0; j < classList.length; j++) {
        if (classList[j].startsWith(prefix)) {
          classList.replace(
            classList[j],
            classList[j].replace(prefix, replacement)
          );
        }
      }
    }
  }

  setColor(color: string) {
    this.systemService.color = color;
  }
}
