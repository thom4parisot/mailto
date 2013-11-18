# mailto

> Transform your HTML forms in beautiful mailto: links, form submission or XHR requests.

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
```


# JavaScript API
