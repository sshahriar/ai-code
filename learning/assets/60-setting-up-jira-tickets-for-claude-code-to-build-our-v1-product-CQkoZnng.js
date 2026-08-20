var e=`# Setting Up Jira Tickets for Claude Code to Build Our V1 Product

> Week 2 · Day 5

## Overview

Okay, this is us back in JIRA again. Check this out.

You can see that it moved the other tickets to Done. I didn't remember seeing it do that.

I didn't ask it to. I don't think I don't remember, but it did.

## You will learn

- Understand the main ideas covered in **Setting Up Jira Tickets for Claude Code to Build Our V1 Product**
- Follow the practical walkthrough from Week 2, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Okay. So now we're going to create some more tickets. I just started writing this one.

Let's have the first of them being from prototype, build foundation of V1 product. Let's start with that as a ticket. And then the next ticket is going to be add AI chat, but still just mutual NDA.

And then the next up is expand to all legal, all supported legal document types. There we go. That's our three sets.

This is coming in from our business. Let's have a look at this one. First of all, maybe this one is a bit more of a technical one, but this one is upgrade prototype so that it is the proper technical foundation for the full V1 project including front-end, back-end, and temporary database with scripts to start and stop, but without updating the functionality yet.

Let's say the features, the product features. Yes, that seems like a clear instruction. That's may well.

That's probably one of the technical lead we've put in rather than the business sponsor but you would say as we move from prototype to the full v1 that would be the next thing that we would do so I put that in the comments stupidly let me cut that I meant to put it in the description put it in there that's what I meant to do save that there we go very good that is our first ticket added presumably yes we are pl4, now I'm going over here to PL5, add AI chat, but still just mutual NDA. We're gonna say now change the user, the UX user input, let's write it in business speak. Now change the way the platform the product interacts with a user Instead of a series of of questions This should be a free form chat with an AI the AI asks about form chat with an AI.

The AI asks about the document, asks questions related to the fields and populates the document based on the responses. And I think that's it. I'm not going to mention Soree Brass.

I'm not going to mention using structured outputs or anything else. I can think in my mind there's different ways to interpret this. Like is it able to change the text outside the key fields?

I'm not sure. I think we're just going to let it interpret it as it wants. Maybe ask us some questions.

That seems like a cool way to do it. Yet again, I put that in the comment instead of the description. What's wrong with me?

### Deep dive

There we go. I'm too excited. Save that.

Okay, let's keep going. Okay, now it's on to PL6. Up it comes.

Let's click in description, paste in one. I just wrote. Now expand the functionality so it supports all legal document types for which we have templates engaged with the user if they want an unsupported document.

Explain we can't generate that, but offer a closest document that we can generate. Save that. There we go.

OK. And then I just want to be clear about the users. Let's just see, hang on.

For upgrade the product, the proper will do front and back in. can only have a fake login screen for now. No authentication.

Just bring the user into the platform. So that's clear. I don't want to add on user authentication upfront.

But at the end of it, we will, I press Save by mistake, we'll add in one more ticket in here. What needs to be done, support multiple users. Let's write that.

Okay, so I'm going into support multiple users, go to the description, and I'm gonna paste in there, add a proper sign in and sign up screen. Then let's use a register and come back into the platform. Store previously generated documents, allow the user to look back at prior documents that they've created.

The database can be temporarily reset, can be temporary, can be temporary, and be reset every time the server restart, that's fine. Also add polish to all the screens also add polish to all the screens so that they look like a subject to legal review. And let's change this to support multiple users and other final polish.

### Putting it together

There we go. Okay, got there in the end. There we go.

Okay, got there in the end. This is our, this is our, our Dura board now. We've got our four tickets, PL4, 5, 6 and 7 with the functionality you want to build.

Imagine it's been your engineering lead, your product people, your business sponsors, maybe even your clients that have come in and added these Dura tickets. Typically this would now go off to the engineering team. These will be assigned off to different people but what we're going to do is we're going to assign it of course to our friend Claude Code.

So here I am in VS Code. Close down these open screens including our beautiful new skill. Let's bring up a new terminal and I'm going to type Claude.

And the first we want to make sure is see what we see if I do slash context. We're hoping to see that there is a new skill, Siribras inference, a project skill, isn't that cool. We could see that we've got our plugins and we know, of course, that we have our existing Atlassian and GitHub MCP servers.

Now, and you can see that we've used up a fair amount of contacts with the MCP tools that we've got, but we are in we're primed for our project. Is there anything we have to do first? Yes, there is.

I know you're thinking, why is there always something we have to do first? This one is an obvious one. We have to do that authentication again because of Atlassian is funny.

Come on in, reauthenticate, here we go, approve. I tell you, if I don't do this it wouldn't work. Accept, accept.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Okay. So now we're going to create some more tickets. I just started writing this one.

## Practical tips

- Just bring the user into the platform. So that's clear. I don't want to add on user authentication upfront.
- And the first we want to make sure is see what we see if I do slash context. We're hoping to see that there is a new skill, Siribras inference, a project skill, isn't that cool. We could see that we've got our plugins and we know, of course, that we have our existing Atlassian and GitHub MCP servers.
- I know you're thinking, why is there always something we have to do first? This one is an obvious one. We have to do that authentication again because of Atlassian is funny.
- Come on in, reauthenticate, here we go, approve. I tell you, if I don't do this it wouldn't work. Accept, accept.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Okay, we're ready. We're authenticated. So right away I come back. It's time for us to do this.
`;export{e as default};