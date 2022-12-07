# Questions

## 1. What is the difference between Component and PureComponent? Give an example where it might break my app
R: `PureComponent` acts like a regular `Component` the difference is that its state and props comparision is shallow, it doesn't go deeper in a nested object to see if it's wheter different to trigger a re-render. So you can gain an performance boost in some components you don't need a full deep comparision on your state and/or props. A case where it might break is some pure component that stores complex data (like personal info) in one object so when a change occurs you won't see reflected on your page because it didn't go deep to check a change in like `person.address.coordinates.x`.


## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
R: It's because if the parent's context have changed you now have to tell the components's children/descendant that changes were made and they have to re-render. If you don't do it your children won't receive new context changes anymore. They have to act like state and you shouldn't mess with it regardless what your component is doing on shouldComponentUpdate.


## 3. Describe 3 ways to pass information from a component to its PARENT.
R: 
1. The most common one is passing in a callback function defined in the parent component as props to its child. So whenever the callback is called you can pass some data as parameter to it.
2. Using Context API.
3. Using a state management library.


## 4. Give 2 ways to prevent components from re-rendering.
R: `shouldComponentUpdate` hook method is a great way of doing it, returning false it won't re-render. Also you can memoize a function component with `React.memo`. It works just like a Pure component, but you can pass a second argument, which is a function defining whether or not to re-render your component. If it returns false it won't re-render.


## 5. What is a fragment and why do we need it? Give an example where it might break my app.
R: It's used to group a bunch of elements without creating an extra node. Because you can't render all of them at top level of your tree. React only accepts returning ONE element. If you put several element side-by-side at the top-level of your returning it'll thrown an Error. So you must wrap them up in a single element. Fragment is the solution.


## 6. Give 3 examples of the HOC pattern.
```jsx
function withSomething(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        counter: 0
      };
    }

    return <WrappedComponent  />
  }
}
```

```jsx
function withCounter(WrappedComponent) {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);

  return <WrappedComponent counter={counter} increment={increment} decrement={decrement} />
}
```

```jsx
function withMouse(WrappedComponent) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const updateMouse = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateMouse);

    return () => window.removeEventListener("mousemove", updateMouse);
  });

  return <WrappedComponent x={mouse.x} y={mouse.y} />
}
```


## 7. What's the difference in handling exceptions in promises, callbacks and async...await.
R: The advantage of handling exceptions in Promises is because of its chain nature once an exception is thrown it'll be handled by the closest rejection handler (`.catch()`). Callbacks are functions passed in as argument to be triggered when the expection is thrown, which if you have several callbacks to deal with it can be difficult to read. Async/await are just like promises but with them you use `try catch` blocks to execute and catch expections when they occur, more like a common synchronous code. 


## 8. How many arguments does setState take and why is it async.
It takes 2 arguments, one is the state changes object or a function containing the previous state that returns a state changes object, and the second is a function acting as side-effect when the state change occurs.


## 9. List the steps needed to migrate a Class to Function Component
1. Change the component definition from class to function.
2. Keep the content from render method (even the return), just delete the function definition and the curly braces.
```jsx
  // FROM
  render() {
    return <h1>Hello, world!</h1>
  }

  // TO
  return <h1>Hello, world!</h1>
```

3. Remove `this`.
4. Every other method should be converted in a function.
5. Remove the constructor entirely. But if you defined state, convert them to `useState` hook calls:
```jsx
// FROM
constructor(props) {
  super(props);

  this.state = {
    counter: 0,
    message: ""
  };
}

// TO
const [counter, setCounter] = useState(0);
const [message, setMessage] = useState("");
```

6. Where you used `this.setState` you should use the equivalent from useState hook (setState):
```jsx
// FROM
this.setState({ message: "Hello, world!" })
this.setState({ counter: this.state.counter + 1 });

// TO
setMessage("Hello, world!");
setCounter(counter + 1);
```

7. If you defined state side-effects, convert them using `useEffect` hook:
```jsx
// FROM
this.setState({ counter: this.state.counter + 1 }, () => {
  console.log('Counter went up.');
});

// TO
setCounter(counter + 1);
useEffect(() => {
  console.log('Counter went up.');
}, [counter]);
```

8. If you used lifecycle methods with hooks:
`componentDidMount`:
```jsx
useEffect(() => {
  console.log('Component mounted');
}, []); // It should be an empty array to execute only once (when the component is mounted). 
```
`componentWillUnmount`:
```jsx
useEffect(() => {
  console.log('Component mounted');

  return () => console.log('Component will unmount'); // function returned will be executed on unmount
}, []); // It should be an empty array to execute only once (when the component is mounted). 
```
`componentDidUpdate`:
```jsx
useEffect(() => {
  console.log('Component updated');
}); // without second argument
```

## 10. List a few ways styles can be used with components
R: Inline, CSS Modules, Styled Components, CSS-in-JS, etc...


## 11. How to render an HTML string coming from the server.
R: Using `dangerouslySetInnerHTML` prop on HTML elements.
```jsx
  <p dangerouslySetInnerHTML={{ __html: serverHTML }}></p>
```
