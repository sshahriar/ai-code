# Writing claude.md and Creating Custom Skills for Cerebras

> Quick summary | Week 2 | Day 5

## At a glance

Okay now it's time to write a claw dot md and you know there's no there's no secret here that that you need to put work into your claw dot md to get it right for your project that of course it's tempting just to do like a rough loop or something just give it a one sentence let it go but if we're trying to build a strong project here this is our opportunity to influence like the boss this is where we put our human element behind it and make something that's really differentiated. So look, I've just written this claw.md, let's take a look at it, the pre-legal project.

This is a SAS product to allow users to draw legal agreements based on templates in the templates directory. The user can carry a chat in order to establish what document they want and how to fill in the fields.

The available documents are covered in catalogue.json file in the project route included here. And then I've done this thing here at and then something.

## Key takeaways

- If you do that, I think I mentioned this before a while back, if you do that, it inserts that file, and this can be like a long path to something, or in this case, catalogue.jso...
- It's a great trick to know about. And then I'm just giving it the context. The initial implementation is a front-end-only prototype, just so that it understands what's going on.
- Okay, so that's the overview. And you'll notice I haven't given it all the business requirements 'cause we're gonna use JIRA for that, but I've given it the overall context so t...
- And then I've got a section that's called Development Process, which is just saying, use your Atlassian tools to read the feature instructions from JIRA, develop the feature to...
- Thoroughly test the feature with unit test integration tests, fix any issues, submit a PR using your GitHub tools. And now, for AI design, I've put in these two sections, AI des...

## You will learn

- Core ideas from **Writing claude.md and Creating Custom Skills for Cerebras**
- Practical steps shown in Week 2, Day 5
- How to apply the workflow in your own projects

## Bottom line

If you want to use a proper database, like use superbase or something to have an API database, then you should definitely do that. You've taken my ML obstacles, so with my NAN course, you know how to do these kinds of things using Clark or superbase. But I'm going to keep it simple for this, and just say the backend, the front end, the database should use SQL Lite and be created from scratch each time the Docker container is brought up, allowing for a users table with sign up and sign in. Okay, that's a very simple extra directive we'll put in there, leave that there so it's got that information too, and now I believe that we're ready.
