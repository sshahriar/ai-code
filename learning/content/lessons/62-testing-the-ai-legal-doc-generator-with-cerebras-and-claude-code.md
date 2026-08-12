# Testing the AI Legal Doc Generator with Cerebras and Claude Code

> Week 2 · Day 5

## Overview

It's absolutely remarkable. It's done everything.

It's been chugging for a while. It's seven minutes.

I think it's been longer. I think that's just the last step of it or something.

## You will learn

- Understand the main ideas covered in **Testing the AI Legal Doc Generator with Cerebras and Claude Code**
- Follow the practical walkthrough from Week 2, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Successfully implemented JIRA Tech at PL5. What was built, an AI chat interface, backend API, light L&M integration with Suribras, presumably per the skill. We will soon see structured outputs and a live preview updates.

and it's made all these and it's made a PR and that PR is right here and let's go and take a look. So this is GitHub right here. So if we go into pull requests, we'll see there is indeed a PR right here.

Let's go into the PR. It says ticket number PL5 on here. This is the details of everything that's going on.

13 files have been changed 456 lines of code. So let's come into it. We can see the PR.

We can see that this is the pedantic object. If you're familiar with this stuff, what I'm looking for is to see whether or not it's used its skill to to to call the LLM in the right way. Let's see here we go.

It has indeed extra body. You remember that's exactly from the way I put it in the skill. Let's see where extra body is and make sure that there it is.

That's precisely taken from the skill. It's taken the skill, it's backed about in exactly the way I wanted it to. It's using the right model.

Everything looks good from just looking at the code. It's time for us to try it. So back we go here.

Let's go over here and let's, I'm not sure if it's already running, let's stop it if it is already running. So that would be scripts slash stop Mac, if we need to. Okay, and now we're going to do scripts slash start Mac.

Okay, off it goes. It says it's running. Okay, we will, we'll see.

Right, come on, click to bring this up. Here it is. Okay.

Well, hello, I'll help you create a mutual non-disclosure agreement. Let's start with the basics. What's the purpose?

So yes, I'm evaluating a business relationship. Okay, we get back an AI response. When would you like today?

Let's say yes today. Sounds good. Let's set the effect to date for how long?

Three years. Please. By the way, you see how fast it is?

BAM! You see what I mean? There would be no need for streaming for this.

It's like the first chunk is everything. Got it. The MDA, uh, okay.

That's interesting. So I guess it thinks it's happened over here. It's sort of stopped asking questions.

Um, okay. What else do you need to know? Great, next could you, the confidential protected two years?

Yeah, okay. What was this? How long was she over here?

### Deep dive

Two years. Got it. Okay, yeah, obviously that's a piece of feedback we need for it.

It's that needs to always ask the next question. Otherwise we're just left like this. But you can see over here, we've got something that presumably we can download as it is, oh I see them.

We can't download till we get to the end of it. What else do you need to know? We're almost there, which state one New York, 2 New York, 3 just put default company names in there for now.

We're giving it something that requires a little bit of thinking through. Perfect, I'll use yes, finalize it. Okay, wow, it's done.

And now download PDF has appeared up here. And that's pretty cool. Let's try that, there it is.

Let's open it and here we have it. So look, it's not without a few things that need to be tweaked. I don't know if you noticed as well that it didn't automatically give focus to that window.

So we've got a bit of feedback. It needs to keep asking questions or conversation dries up. But it worked, we had AI chats using open-r using Suribras on new skill.

I think that's 90% victory, I would say. And luckily, we've got more, more geo tickets to go, more opportunities for it to fix it up. Okay, so back we are here.

So, yes, please, merge the PR locally, push and push and switch to main branch. We'll get that done. Then we'll check out our context.

It's already mentioned somewhere that it updated claw.md, but I'll give it one more chance to do that as well. After it's done all this done, merged. Please check Claude.md is up to date with project status, but I think it is already.

And we'll see how it is. (silence) Clauders up to date. Okay, great.

Let's do slash context. See how we're doing. Scroll here.

Look at that. We're almost full. Very nice.

Okay, so now time to do the good old slash clear. It feels almost scary doing this as well. All of the information that we're wiping.

There we go, it's gone. And now we know what to do next. First thing we do is slash mcp.

And then we go in here and we say re-authenticate. And up comes this and we say approve. And we say accept.

And then we go back to the code again. Okay, very good. And now we go up, up, up, up.

And here we go. Implement your ticket of fixes. Ensure that after answering a question, the UI focus goes back to the text input field.

And ensure that the AI always asks a follow-on question if it needs more information. When PL6 is done and these enhancements are done, please make a PR. Test.

Then make a PR. Okay, that all seems good to me. That seems good to you.

### Putting it together

Are you ready? Let's do it. Hopefully it didn't take so long over that that we've already lost our authentication to Jira.

Let's see. It's now it's working fine. We're off.

We're off. We're on to PL6. And that, of course, if you remember, is expanding it to support all the other documents.

So off it goes doing its stuff. This time I might just let it go and I'll answer the questions myself unless I feel like they're going to be useful for you to see them so that we can speed this along and get to a product. Oh, we're done.

The questions were good. I mostly just took its defaults. It is now completed PL6, expanded to support all legal document types, some additional fixes, the two that I asked for and some quality improvements based on its review and it's made a PR.

But first, it's time for us to test it. So I already actually started up the server. And let's go and have a look.

Let's go to local host through 8,000. Sorry, localhost 8,000. Let's see what we have.

Wow, bam, here's something. Ha ha ha. Let's expand it.

I don't know if I remember seeing last time that it has all the right color scheme. Hello, I'll help you create a legal agreement. What type of document do you need?

For example, here's some. All right, let's say we want a cloud SAS agreement. a cloud sass agreement.

Okay, bam, so fast. Great, a cloud service agreement it is. Let's start.

Please be telling the name of the provider company. What's a brief, please use invented, names, invented placeholder names for both companies. for both companies.

The cloud service is an AI assistant. Let's go with that. Okay, off it goes.

What start laws New York, New York please. And notice on the right things are filling in. There we go, New York is just filled in.

Noted subscription period, one year, business, hours, phone support. Seems very reasonable. These are all great questions.

Let me know the pricing structure. Let's say it's going to be 10,000 per annum. Per annum.

Invoice a net 30. Okay. Thanks for the details.

That all seems good, perfect. Oh, I don't need to say perfect. It's already done.

(laughs) I don't need to say anything at all. It's happened, it's been built, it says download PDF, I press that, we have a PDF. We have success, that is a completed product and it has the right brand colors too and it's looking really terrific.

This is so impressive. And of course there's no surprise but there's a pull request right here.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Successfully implemented JIRA Tech at PL5. What was built, an AI chat interface, backend API, light L&M integration with Suribras, presumably per the skill. We will soon see structured outputs and a live preview updates.

## Practical tips

- It has indeed extra body. You remember that's exactly from the way I put it in the skill. Let's see where extra body is and make sure that there it is.
- It's that needs to always ask the next question. Otherwise we're just left like this. But you can see over here, we've got something that presumably we can download as it is, oh I see them.
- Let's open it and here we have it. So look, it's not without a few things that need to be tweaked. I don't know if you noticed as well that it didn't automatically give focus to that window.
- And ensure that the AI always asks a follow-on question if it needs more information. When PL6 is done and these enhancements are done, please make a PR. Test.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Here it is, pull request for PL6. Come on in here and you'll see another 2.5 thousand lines of code added to our repo with 16 files changed. Lots of stuff in here. Super impressive stuff.
