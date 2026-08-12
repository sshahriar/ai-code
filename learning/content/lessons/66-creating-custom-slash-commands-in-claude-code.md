# Creating Custom Slash Commands in Claude Code

> Week 3 · Day 1

## Overview

Okay, now that you know all about what we've got in store for this week, let's look at the techniques we're learning today. And we're going to start by creating a new slash command.

How do you create slash commands for your projects or for your workspace? And it's unbelievably simple.

It all comes back again to the dot-clawed folder. There are in fact two ways of doing it.

## You will learn

- Understand the main ideas covered in **Creating Custom Slash Commands in Claude Code**
- Follow the practical walkthrough from Week 3, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

And the first is within dot-claud, whether it's in your project or for your in your home directory, applying to all of your projects, we're going to do it in a project, you make a new folder and you'll never guess what it's called, it's called commands. So we made a new folder called commands. And in that folder, you put different markdown files for each of the slash commands you want to add.

So if I want to have a new slash command, I just mean I want to be able to type slash and then type something new, then it's going to do something new for anyone that's using my project. We're going to call one that is like review, or call it doc review.md. It's most common to have these kinds of commands and skills and so on be in lowercase with a hyphen.

And I've actually changed the name of the cerebras skill to follow that pattern. And we're going to do that with Doc Review right here. So what we put in here is what do we want this command to actually do?

So I'm gonna paste in this. Review the documentation file in the planning folder called, and then this thing, dollar arguments and block caps like that. And that just means, shove in here whatever the person using Cloud Code puts after the slash command.

You'll see. Review the documentation file in the planning folder called dollar arguments and add questions, clarifications, or feedback to a new section at the end. Let's add along with any opportunities to simplify.

That's such an important thing. Let's just make that part of what the dock review does. So we save that file.

This is a file called docreview.md and just by virtue of saving the file inside a commands folder, we have just given ourselves a new slash command. Don't believe me? Let's give it a try.

I'm going to bring up my favorite terminal like this. I, Opus 4.6 is here, oh my goodness Christmases come early. Okay, now I have new slash command.

So I can press slash and now I can type doc review. Look at that doc review is there, it is a real slash command that we've got. And now what comes next is what we passed in as dollar arguments right there.

So I'm gonna type out plan.md, that's what I want it to review. plan.md. That's what I wanted to review.

Do this. Let's see what happens. It's unraveling apparently.

I'll start by reading plan.md files to thoroughly review it. Now let me search the existing project state to understand it's doing stuff. It's hopefully going to realize that absolutely nothing has happened.

And now it's got a yes, empty scaffolding. Very good. Thank you.

Now let me add the review section to plan. So it's all doing exactly what we wanted. It's going through and doing the analysis and when I come back we will look at its results.

Okay, it's completed. It's always best to close down previews that are already open because it sometimes caches a preview. We'll open that up again and let's go to the bottom.

Let me hide that terminal for a second and see what's going on. Document review is a new section at the end. That seems to have worked.

Our slash command has worked, but let's see what it actually is saying. Questions and clarifications. Brand colours header is orphaned.

That's probably my fault. It appears as a dangling label below the colour scheme. The colour scheme breaks the numbers.

Okay. Okay, we'll let it fix that. Docs versus planning and consistency.

### Deep dive

The key boundaries. Okay. Okay.

That's my mistake. Script naming. Start windows versus start.

Okay. That's another mistake by me. That was not made by Claude.ai.

That was made by me making a version of it and then changing it. Amazing. Price history for sparklines.

That seems like a good thing. Portfolio snapshots, what triggers recording, chat streaming, post-response format. Quantity is real, is shared fractional.

Yeah, no, I think shared, shared, let's, I think, I think we will put here is quantity as real. We're going to say answer. Yes, fractional shares should be supported.

Be supported. Okay, let's go back. Simplification, drop the massive API integration.

Okay, drop user ID from all tables. No, accumulate Spark data on the front end, not the back end. No, I don't like that much.

Use a simple periodic timer. Take a snapshot every 30 seconds, simple, and, (laughs) I don't like it simplification suggestions. I must be honest, simplify the, don't stream just for trouble.

I agree with that. I thought that's what we were doing. That's for sure.

Consider dropping the separate. So don't's for sure. Consider dropping the separate.

So don't agree with that. Consider dropping player, right? Don't agree with that.

Okay, so let's just leave in the one simplification. So this is an example again of the human oversight. It was important that we asked it for simplification opportunities, but I don't agree with many of them, and this is where you have to exercise some discretion, maybe ask more questions.

This is where you add value, and where you need to be the boss, be the manager. We want massive API integration. That is a big part of this.

We want to have user ID on all tables. So in the future, we can be able to support multiple users. That seems like just an oversimplification that won't help us.

So does that. This seems like a great important point. Important.

Let's spell it right. Important. Simplify the response flow.

Don't stream. Just return. And yeah, that's exactly right.

Exactly right. And all of this is, it's spot on. It is absolutely spot on.

### Putting it together

And I'm cool. Takes one to three seconds. Fast enough.

Streaming is no meaningful improvement. That's a bad idea and that's also a bad idea. So now we've got this down to something much simpler, but I do agree with all of the points it made in the previous section.

This seems like some really, really great points. Now it's important to understand what this adding the slash command has done and what it has not done. What it's done is it's given us a neat shortcut to prompting the the chord with that particular request to update the the plan document with the feedback.

And that has happened, but all of that and this conversation is part of the conversation history. If I do slash context here, we should see that we've got some some conversation history now, if I scroll up here, not much, but there's a bit and that's what we've just discussed. What we've not done is what subagents are all about.

Subagents are when you spawn like a separate LLM call to take care of something, then it might add to the document and then you come back, in which case as far as this main chat with Claude would be concerned, there would be no extra purple in that context and it wouldn't know about this conversation, but it would discover that plan.md has a new section with questions and that's the key distinction between using normal things like commands and skills versus using subagents that will become more clear when we actually use subagents. But for now, this is all part of the conversation history, so it knows all about this. So I'm going to say I've updated the comments I've updated the comments at the end of Plan.md with my feedback and removed the solutions throughout plan.md letting me know any questions.

So this is an excellent way. This is an example of the balancing forces of using multiple cloud codes to be iterating, but we're doing it in quite a manual way that you're already familiar with from previous weeks. Obviously, what we're going to be heading towards this week is increasingly automating this process of things like reviews.

That's what it's going to be all about. So it's reading the current state of the file. We'll go through this.

I don't need to hold you up for this. You get the joke for this part. I will iterate.

I will get this incorporated in the document, answering questions sensibly. And so should you. You're going to be going through this project too.

You'll be taking it off in your own direction. There might be very different to mine. So you should iterate through, answer questions intelligently, get the document in great shape.

And I'll see you back here in a sec. Okay, that conversation is done. The plan is updated.

It removed the last section. It also convinced me to change my mind on the frontend simplification of one of those charts, the Spotlines Chart, which made a good case. It's very impressive.

I love 4.6, Opus 4.6, the new model. So very good. Now, you may be thinking to yourself, hang on a minute, Ed.

You mentioned that there are two ways to add a slash command, and we only use one of them. So what is the other way? Unless you've already realized the other way.

You realize the other way? Let me show you the other way. So the other way is that skills by default immediately give you another slash command.

If you do a slash, you can see that of the things that appears there, cerebras inference is one of the slash commands available to me. And that's because we have a skill called Siribras inference that you and I wrote. And so it's there already.

So skills give you an instant slash command. And so to be honest, the reality is that that's how people do it these days. If you want, you can have commands done on this way.

You don't need the like what they call the front matter, the yaml stuff at the top of skills, because it's just a just a sentence. So this is still supported and people still use it. But most of the time people just focus on skills now.

It's the easiest way to give yourself a new slash command.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

And the first is within dot-claud, whether it's in your project or for your in your home directory, applying to all of your projects, we're going to do it in a project, you make a new folder and you'll never guess what it's called, it's called commands. So we made a new folder called commands. And in that folder, you put different markdown files for each of the slash commands you want to add.

## Practical tips

- And the first is within dot-claud, whether it's in your project or for your in your home directory, applying to all of your projects, we're going to do it in a project, you make a new folder and you'll never guess what it's called, it's called commands. So we made a new folder called commands. And in that folder, you put different markdown files for each of the slash commands you want to add.
- That's such an important thing. Let's just make that part of what the dock review does. So we save that file.
- This is a file called docreview.md and just by virtue of saving the file inside a commands folder, we have just given ourselves a new slash command. Don't believe me? Let's give it a try.
- Okay, it's completed. It's always best to close down previews that are already open because it sometimes caches a preview. We'll open that up again and let's go to the bottom.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And we can equally drag this thing over to to the skills section and give it a folder of its own and make a skills.md with a bit of yaml on the top of it. And it would all work great too. And that is often the way people do it. Those are the two different ways you can give yourself a new slash command and of course if it's in the dot-claud directory and you check it in to git then everyone else in your project team gets those commands too.
