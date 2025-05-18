import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hungarianDate',
    standalone: true
})
export class HungarianDatePipe implements PipeTransform {
    transform(value: Date | string | undefined | null): string {
        if (!value) return '';

        const date = new Date(value);

        return new Intl.DateTimeFormat('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);
    }
}
