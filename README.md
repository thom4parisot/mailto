# mailto

> Transform your HTML forms in beautiful `mailto:` links, form submission or XHR requests.

# What is does

It takes that:

```html
<fieldset>
  <legend>Talk Proposal</legend>

  <form method="POST" action="mailto:organisers@event.com">
    <label>
      Your name:
      <input type="text" name="username">
    </label>

    <label>
      Your email:
      <input type="email" name="from">
    </label>

    <label>
      Talk Title:
      <input type="text" name="title">
    </label>

    <label>
      Talk Format:
      <select name="format">
        <option></option>
        <option>Lightning Talk</option>
        <option>Keynote</option>
        <option>Workshop</option>
      </select>
    </label>

    <label>
      Talk Description:
      <textarea name="description"></textarea>
    </label>

    <input type="submit" value="Send Proposal">
  </form>
</fieldset>
```

And generates that:

> Dear organiser,
>
> I am **John Doe** and I propose you a topic entitled **Lightning Talk** entitled **Low-tech HTML forms without server component**.
>
> Here is what I have to say about it:
>
>> This is better than every social media marketing e-reputation blogware software in the cloud. Convinced? Are you a VC? Worth 20 millions, at least.
>
> You can address me an email at john@doe.co.uk or by replying to this email.

# Examples

## Simple posting with `mailto:`

```js
var m = new Mailto('form[action^="mailto:"]', {
  onSubmit: Mailto.sendForm
});
```
**Notice**: not yet implemented.


## Posting with `mailto:` and a custom layout

The `formatter` will help you to format the form values with your own logic.

```js
var templateSource = document.querySelector('#email-template').innerHTML;
var template = handlebars.compile(templateSource);

var m = new Mailto('form[action^="mailto:"]', {
  formatter: function(m){
    return template(m.getData());
  }
});
```

## Posting with Ajax/XHR

```js
var m = new Mailto('form[action^="mailto:"]', {
  onSubmit: function(m){
    $.post('/contact', { type: 'json' }, m.getData());
  }
});
```

## Preview as plain text before sending

```js
var form = document.querySelector('.mailto-form');
var m = new Mailto(form);
var previewButton = form.querySelector('.preview-button');
var previewContainer = form.querySelector('+ .preview-container');

previewButton.addEventListener('click', function(){
  previewContainer.innerHTML = m.getBody();
  previewContainer.hidden = false;
  form.hidden = true;
});
```

## Update a fallback on form update

```js
var form = document.querySelector('.mailto-form');
var m = new Mailto(form);
var emailLink = form.querySelector('.email-link-fallback');

form.addEventListener('change', function(){
  emailLink.href = m.getMailtoUrl();
});
```

# JavaScript Options

## `preventDefault`

## `formatter`

## `onSubmit`

# JavaScript API

## `new Mailto(form[, options])`

## `getData()`

## `getBody()`

## `getFormData()`

## `getMailtoUrl([to, [fields]])`

## `formatData(data)`

# Contributing

One rule only: *respect the code*. For the rest, bring your ideas, raise issues and push code :-)

# License

> The MIT License (MIT)
>
> Copyright (c) 2013, Thomas Parisot
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
