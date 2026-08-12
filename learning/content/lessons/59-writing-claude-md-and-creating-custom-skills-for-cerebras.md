# Writing claude.md and Creating Custom Skills for Cerebras

> Week 2 · Day 5

## Overview

Okay now it's time to write a claw dot md and you know there's no there's no secret here that that you need to put work into your claw dot md to get it right for your project that of course it's tempting just to do like a rough loop or something just give it a one sentence let it go but if we're trying to build a strong project here this is our opportunity to influence like the boss this is where we put our human element behind it and make something that's really differentiated. So look, I've just written this claw.md, let's take a look at it, the pre-legal project.

This is a SAS product to allow users to draw legal agreements based on templates in the templates directory. The user can carry a chat in order to establish what document they want and how to fill in the fields.

The available documents are covered in catalogue.json file in the project route included here. And then I've done this thing here at and then something.

## You will learn

- Understand the main ideas covered in **Writing claude.md and Creating Custom Skills for Cerebras**
- Follow the practical walkthrough from Week 2, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

If you do that, I think I mentioned this before a while back, if you do that, it inserts that file, and this can be like a long path to something, or in this case, catalogue.json is just in the project route, then that just gets shoved in there in the file. I remember I told you about this one, I said you could have an agents.md that this could just refer to. So that's why I'm doing that here.

It's a great trick to know about. And then I'm just giving it the context. The initial implementation is a front-end-only prototype, just so that it understands what's going on.

Okay, so that's the overview. And you'll notice I haven't given it all the business requirements 'cause we're gonna use JIRA for that, but I've given it the overall context so that it's clear. It's easy to be coherent when it knows what the game is.

And then I've got a section that's called Development Process, which is just saying, use your Atlassian tools to read the feature instructions from JIRA, develop the feature to not skip any steps, you just factor in what we've already learned. Thoroughly test the feature to not skip any steps. You just factor in what we've already learned.

Thoroughly test the feature with unit test integration tests, fix any issues, submit a PR using your GitHub tools. And now, for AI design, I've put in these two sections, AI design, technical design, when writing code to make calls to alarms, use your cereibras skill. What's that you're wondering?

To use light NLM via open router to the GPT-OSS 120B model with Suribras as the inference provider. You should use structured outputs so you can interpret the results and populate fields in the legal document. Well, so you're thinking I'm gonna add in a skill called Suribras that's gonna make all of this clear.

Well, I hope I've gone out. Maybe we're gonna do that together in a second. Technical design, the entire project should be packaged into a Docker container.

The backend should be in backend/ and be a UV project using fast API. The front end should be fast, front end/ consider. This is similar to what we said last time.

There should be scripts like this. Now I noticed you can see there that one of the funny things about Markdown, I put this as separate lines, but it doesn't put them as separate lines when you look at a preview. To do that you have to put two spaces at the end of each line like this.

Oops, and now it's turned into a full stop by default. And then this, now if we now look at the preview, you're wondering what I just did, save that right click, open preview. Now you're gonna see that this technical design is laid out much more nicely.

That's what I wanted and then these are the start and stop scripts and that's where the backend will then be running and I shoved my color scheme in at the very end with my personal favorite brand colors, the ones from the slide deck. So that is where we are. That's laid out a nice claw dot indeed.

Do we have anything else to do before we start well yes we have to make this skill okay so we're gonna make a new skill it's gonna be a skill that anyone on our project our other team members will be able to use too because it's going to be an important skill for this SaaS product and it's going to be a skill that's about calling an LLM but I want to call an LLM in a particular way for this product what I really care about is that I want the responses to be incredibly fast. I want the LLM to respond really quickly. And to do that, I'm going to use an open source model, GPT-OSS120, and I'm going to use it over open router as we've done before, which is great.

But I'm going to, with open router, I'm going to specify, I want it to use one of the providers. In particular, I want to use a provider called SoreeBrass, which is super fast. You pay a little bit more, it's still quite cheap, but it's a little bit more than normal for GPT ISS 120, but as a result, you get stuff really, really fast.

### Deep dive

Now, you may want to stick with three models, you may not want to do this, in which case, just skip this part or change the skill to something different, but that's what I'm going to do to demonstrate creating our own skill. And also, while I'm at it, show you siree brass. So I'm going into the dot cloud directory, I'm making a new folder and I'm calling it skills.

And then I'm going to make a new folder in here. And this folder is what you call the name of your skill. I'm going to call it siree brass.

There it is. That is my new skill. And now within that, I'm making a new file, and that new file is going to be the one that's going to have the agent skill itself, which is skill.md.

This is where we begin. Okay, and at the top of the file, skill.md, you have to put something in with this exact format. And look, it's a bit like API keys.

You've got to get this format right. If you get it wrong, it won't work. And you know, I'm here to help you.

I'll help you if you get stuck, but it's very hard for me to debug that remotely. It's the best thing to do is to just get it right. So using this format, and of course I have this in the course resources, but you can, we're now going to give it a name.

We're going to call it Ceribras. It's going to be the Cerib. We're going to call it "Serebrass." It's going to be the "Serebrass inference" we'll call it.

Use this to write code to call an LLM using light LLM open Rousa with the cerebras inference provider. There we go. That's very clear.

That's exactly what we're going to do with this skill. I'll save it so that dot disappears. That is the metadata for the skill.

Okay, and now to paste in the skill itself, and I've just written this, and obviously take care of these things, but I'm gonna put this in the course resources of course. And let me just quickly show it to you. I'll open it as a preview.

So you can see what this is. Calling an LLM via cerebras. These instructions allow you to write code to call it LLM with cerebras specified as the inference provider.

And then there's some setup that tells you what to do. And then code snippets, some imports and constants, code to call cerebras, code to call cerebras for structured outputs. And there is some clear code, some good examples, very simple, clearly explained, that should be all it takes to add our own skill.

Now, we're pretty much ready to go just a couple more things to do. I just want to make this model clear to in our claw.md and tell it one more thing and then we're ready to go. So back we go over to the claw.md and over here I just in this AI design I want to make it clear that we're going to be using the model that we've got.

### Putting it together

Let's just put this in here. Hang on, let me delete that. We'll use our back ticks in markdown to show code.

I'm going to put that in there for that model to the open router, open AI GPT, OSS 120B model with cerebras as the inference provider. That seems clear. OK.

And then one more thing we've got to do. Do you know what that is? We we have to add our.env file with our open router key that we set up before I can just copy it across into here.

I'm going to do that right now and you should do it too. And the simplest way to do that is to bring up a new terminal. We're in pre-legal here and we just do CPE for copy.

We want to go up one directory. We want to go into the directory that's called pm and we want to take the.env file that's there and we want to copy that right here in this current directory. Bam, the.env file has appeared.

I'm not going to double click on it because then you'll see my key. But hopefully you've done that and you've checked it and it's got open router API key spelled right in there. And then as a final step, I just checked that we have explained here that that key just in case we absolutely crystal clear.

There is an open router API key in the.env file in the project route. Done. Okay.

So it's super clear now. We've got everything laid out. We've got a cloud.md in our home directory.

We've got one here. We've got a.env file and we've even added a new skill for so rebrass. And we've told it to use that skill in order to do what we need.

So we're already now to build our SAS application. Oh, not so fast. I think I forgot one thing.

In the technical design, I want to say that it should use a database that it sets up in the Docker container just as we did before with the PM project.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

If you do that, I think I mentioned this before a while back, if you do that, it inserts that file, and this can be like a long path to something, or in this case, catalogue.json is just in the project route, then that just gets shoved in there in the file. I remember I told you about this one, I said you could have an agents.md that this could just refer to. So that's why I'm doing that here.

## Practical tips

- If you do that, I think I mentioned this before a while back, if you do that, it inserts that file, and this can be like a long path to something, or in this case, catalogue.json is just in the project route, then that just gets shoved in there in the file. I remember I told you about this one, I said you could have an agents.md that this could just refer to. So that's why I'm doing that here.
- Do we have anything else to do before we start well yes we have to make this skill okay so we're gonna make a new skill it's gonna be a skill that anyone on our project our other team members will be able to use too because it's going to be an important skill for this SaaS product and it's going to be a skill that's about calling an LLM but I want to call an LLM in a particular way for this product what I really care about is that I want the responses to be incredibly fast. I want the LLM to respond really quickly. And to do that, I'm going to use an open source model, GPT-OSS120, and I'm going to use it over open router as we've done before, which is great.
- I'll help you if you get stuck, but it's very hard for me to debug that remotely. It's the best thing to do is to just get it right. So using this format, and of course I have this in the course resources, but you can, we're now going to give it a name.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

If you want to use a proper database, like use superbase or something to have an API database, then you should definitely do that. You've taken my ML obstacles, so with my NAN course, you know how to do these kinds of things using Clark or superbase. But I'm going to keep it simple for this, and just say the backend, the front end, the database should use SQL Lite and be created from scratch each time the Docker container is brought up, allowing for a users table with sign up and sign in. Okay, that's a very simple extra directive we'll put in there, leave that there so it's got that information too, and now I believe that we're ready.
