const React = (function() {
    let hooks = [];
    let idx = 0;

    function useState(initVal) {
        const state = hooks[idx] || initVal;
        const setState = (newVal) => {
            hooks[idx] = newVal;
        }
        
        idx += 1;

        return [state, setState];
    }

    function render(Component) {
        const C = Component();
        console.log('hooks =>', hooks);
        C.render();
        return C;
    }

    return { useState, render }
})();

function Component() {
    const [count, setCount] = React.useState(1);
    const [text, setText] = React.useState('apple');

    return {
        render: () => console.log({ count, text }),
        click: () => setCount(count + 1),
        type: (text) => setText(text)
    }
}


var App = React.render(Component); // 2 次 useState, idx === 2

App.click(); // 將 count 設在 hooks[2] 
var App = React.render(Component); // 2 次 useState, idx === 4

App.type('pear'); // 將 'pear' 設在 hooks[4]
var App = React.render(Component); // 2 次 useState, idx === 6

