# Scalio Challenge

View it online:
https://willowy-phoenix-0ae0b7.netlify.app/

This is the project for the Scalio challenge. React & SCSS were used to build the application!

A couple of consideration points:

- I **didn't** add a keydown handler on the input to initiate a request because the instructions said that the request must be initiated via the submit button. It would be easy to do and it crossed my mind, but I didn't want to "bypass" the rules.

- I used an actual `<table>` tag for the `Results` component. Normally I would use a div because we're only rendering 9 rows of content, but since the instructions demanded an actual `table` that's what I went with!

- I disabled the `robots.txt` file because I didn't want the netlify app to be indexed, which may have caused
the lighthouse score to go down a bit in the SEO section. If this were a real production app I wouldn't have disabled `robots.txt`.

- Since the instructions didn't mention if we should support IE I decided not to, that way the code looks cleaner. I Truly hope that's alright.

That's all, thank you for the opportunity!
