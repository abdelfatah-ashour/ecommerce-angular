import { Component, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import {
  debounce,
  delay,
  catchError,
  mergeMap,
  of,
  switchMap,
  throwError,
  combineLatest,
  map,
  retry,
  concat,
  concatAll,
  interval,
  take,
  merge,
  mapTo,
  skipUntil,
  from,
  filter,
  combineAll,
  Observable,
  tap,
  debounceTime,
  range,
  distinct,
  reduce,
  mergeAll,
  concatMap,
  toArray,
} from 'rxjs';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent implements OnInit {
  ngOnInit() {
    const api1$ = ajax.getJSON('https://api.github.com/users?per_page=1');
    const api2$ = ajax
      .getJSON('https://api.github.com/users?per_page=2')
      .pipe(delay(2000));
    const api3$ = ajax.getJSON('https://api.github.com/users?per_page=3');
    const ids = [1, 2, 3];

    // https://fakestoreapi.com/products/1

    from(ids)
      .pipe(
        mergeMap((id) =>
          from(ajax.getJSON(`https://fakestoreapi.com/products/${id}`)).pipe(
            delay(id * 1000),
          ),
        ),
        retry(2),
      )
      .subscribe({
        next: (response) => {
          console.log('Received response:', response);
        },
        error: (err) => {
          console.error('Error:', err.name, err.message);
        },
      });

    combineLatest([api1$, api2$, api3$]).subscribe({
      next: (response) => {
        // console.log('combineLatest Received response:', response);
      },
      error: (err) => {
        // console.error('Error:', err.name, err.message);
      },
    });

    throwError(() => 'something went wrongs').subscribe({
      //   next: (res) => console.log(res),
      //   error: (res) => console.log(res),
      //   complete: () => console.log('Completed....'),
    });

    // Sample observables
    const obs1$ = of(1, 2, 3);
    const obs2$ = of('a', 'b', 'c');

    const combined$ = combineLatest([obs1$, obs2$]).pipe(
      map(([num, char]) => {
        console.log('num, char', num, char);
        if (num === 2 && char === 'b') {
          // Trigger an error conditionally
          return throwError(() => new Error('Invalid combination of values!'));
        }

        return `${num}-${char}`;
      }),
      catchError((err) => {
        return of(`Error handled: ${err.message}`);
      }),
    );
    //
    // combined$.subscribe({
    //   next: (value) => console.log(value),
    //   error: (err) => console.error('Caught an error:', err),
    // });

    const first$ = interval(1000).pipe(
      take(2),
      map((num) => num + 10),
    );
    const second$ = interval(1000).pipe(
      take(2),
      map((num) => num + 20),
    );
    const third$ = interval(1000).pipe(
      take(2),
      map((num) => num + 30),
    );
    const four$ = interval(1000).pipe(
      take(2),
      map((num) => num + 40),
    );

    concat(first$, second$, third$, four$).subscribe((value) => {
      // console.log('Concat: ', value);
    });

    // merge(
    //   first$.pipe(mapTo('FIRST')),
    //   second$.pipe(mapTo('SECOND')),
    //   third$.pipe(mapTo('THIRD')),
    //   four$.pipe(mapTo('FOUR')),
    // ).subscribe((val) => {
    //   console.log('val', val);
    // });

    // Exercise 1: Basic Observable creation and subscription
    // Create an Observable that emits the numbers 1, 2, 3, then complete.
    // Subscribe to it and log each emitted value.
    const exercise1 = () => {
      // Your code here
      of(1, 2, 3).subscribe((num) => {
        // console.log(`exercise1 ${num}`);
      });
    };

    // Exercise 2: Using map operator
    // Create an Observable that emits the numbers 1, 2, 3, 4, 5.
    // Use the map operator to square each number, then subscribe and log the results.
    const exercise2 = () => {
      from([1, 2, 3, 4, 5])
        .pipe(map((num) => num * 2))
        .subscribe((number) => {
          // console.log(`square ${number}`);
        });
    };

    // Exercise 3: Filtering
    // Create an Observable that emits numbers from 1 to 10.
    // Use the filter operator to emit only even numbers, then subscribe and log the results.
    const exercise3 = () => {
      // Your code here
      of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        .pipe(filter((num) => num % 2 !== 0))
        .subscribe((num) => {
          // console.log(`filter`, num);
        });
    };

    // Exercise 4: Combining Observables
    // Create two Observables: one that emits 'Hello' and another that emits 'World'.
    // Use the concat operator to combine them, then subscribe and log the result.
    const exercise4 = () => {
      concat(of(1).pipe(mapTo('Hello')), of(1).pipe(mapTo('World'))).subscribe(
        (word) => {
          // console.log('word', word);
        },
      );
    };

    // Exercise 5: Error handling
    // Create an Observable that emits numbers 1, 2, 3, then throws an error.
    // Use catchError to handle the error and return a new Observable that emits 'Error occurred'.
    const exercise5 = () => {
      // Your code here
      of(1, 2, 3, 4)
        .pipe(
          map((num) => {
            if (num > 2) {
              throw 'Num more than 2';
            } else {
              return num;
            }
          }),
          catchError((message) => of(message)),
        )
        .subscribe((message) => {
          // console.log(`catchError: `, message);
        });
    };

    // Exercise 6: Debouncing
    // Create an Observable that emits values every 100ms.
    // Use debounceTime to emit only when 300ms have passed without any emissions.
    const exercise6 = () => {
      of(1)
        .pipe(debounceTime(2000))
        .subscribe(() => {
          console.log('message : debounce');
        });
    };

    // Exercise 7: Distinct values
    // Create an Observable that emits the sequence: 1, 1, 2, 2, 3, 3, 4, 4.
    // Use distinctUntilChanged to emit only distinct consecutive values.
    const exercise7 = () => {
      // Your code here
    };

    // Exercise 8: Accumulating values
    // Create an Observable that emits numbers 1 to 5.
    // Use scan to accumulate the sum of emitted values.
    const exercise8 = () => {
      // Your code here
    };

    // Exercise 9: Switching Observables
    // Create an outer Observable that emits two values.
    // Use switchMap to create a new inner Observable for each outer emission.
    // The inner Observable should emit a value every second, but switch to the new inner Observable when the outer Observable emits.
    const exercise9 = () => {
      // Your code here
    };

    // Exercise 10: Cancelling subscriptions
    // Create an Observable that emits a value every second.
    // Create another Observable that emits after 5 seconds.
    // Use takeUntil to cancel the first Observable when the second one emits.
    const exercise10 = () => {
      // Your code here
    };

    // Uncomment and run each exercise to test your solutions
    exercise1();
    exercise2();
    exercise3();
    exercise4();
    exercise5();
    exercise6();
    exercise7();
    exercise8();
    exercise9();
    exercise10();

    // Exercise 1: Filtering and Mapping
    // Create an Observable that emits numbers from 1 to 10.
    // Filter out odd numbers, then square the even numbers.
    const exercise11 = () => {
      // Your code here
      range(1, 10)
        .pipe(
          filter((num) => num % 2 !== 0),
          map((num) => {
            // console.log('num * 2', num * 2);
            return num * 2;
          }),
        )
        .subscribe((num) => {
          console.log('exercise11 ', num);
        });
    };

    // Exercise 2: Debouncing and Distinct
    // Create an Observable that emits mouse move events.
    // Debounce the events by 300ms, then emit only distinct consecutive coordinates.
    const exercise12 = () => {
      // Your code here

      of(1, 1, 2, 2, 3, 4, 5, 6, 7, 7, 5, 4, 1)
        .pipe(distinct())
        .subscribe((num) => {
          console.log('distinct', num);
        });
    };

    // Exercise 3: Error Handling and Retry
    // Create an Observable that occasionally throws an error.
    // Implement error handling to retry up to 3 times before catching the error.
    const exercise13 = () => {
      // Your code here
      const api13$ = ajax.getJSON('https://api.github.com/users/1');

      api13$
        .pipe(
          retry(3),
          catchError(() => of('cant fetching the user.')),
        )
        .subscribe((val) => {
          console.log(`val: ${val}`);
        });
    };

    // Exercise 4: Merging and Reducing
    // Create two Observables emitting numbers.
    // Merge them and then reduce to find the sum of all emitted numbers.
    const exercise14 = () => {
      // Your code here
      merge(of(1, 100), of(70, 200))
        .pipe(reduce((acc, value) => acc + value))
        .subscribe((num) => {
          console.log('merged and reducer.', num);
        });
    };

    // Exercise 5: Switching and Mapping
    // Create an Observable that emits user IDs.
    // For each ID, switch to a new Observable that fetches user details.
    const exercise15 = () => {
      // Your code here
    };

    // Exercise 6: Buffering and Filtering
    // Create an Observable that emits a value every second.
    // Buffer the emissions for 5 seconds, then filter out any buffer that doesn't contain at least 3 elements.
    const exercise16 = () => {
      // Your code here
    };

    // Exercise 7: Concat Mapping and Delaying
    // Create an Observable that emits three numbers.
    // For each number, create a new Observable that emits that many times, with a delay between each emission.
    const exercise17 = () => {
      // Your code here
    };

    // Exercise 8: Combining Latest and Mapping
    // Create two Observables: one emitting names, another emitting scores.
    // Combine the latest emissions from both and create a string representation.
    const exercise18 = () => {
      // Your code here
    };

    // Exercise 9: Fork Joining and Reducing
    // Create three Observables that complete after emitting a few numbers.
    // Use forkJoin to wait for all to complete, then reduce the results to find the maximum number emitted.
    const exercise19 = () => {
      // Your code here
    };

    // Exercise 20: Throttling and Scanning
    // Create an Observable that emits mouse click events.
    // Throttle the events to at most one per second, then scan to keep a count of clicks.
    const exercise20 = () => {
      // Your code here
    };

    // Uncomment and run each exercise to test your solutions
    exercise11();
    exercise12();
    exercise13();
    exercise14();
    exercise15();
    exercise16();
    exercise17();
    exercise18();
    exercise19();
    exercise20();
  }
}
