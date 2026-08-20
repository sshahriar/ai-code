var e=`# Setting Up a Full-Stack Project with GitHub Copilot & FastAPI

> Week 1 · Day 5

## Overview

So yesterday we used cursor to build out our project. Today we are going to use GitHub co-pilot.

Or at least I am. You can use whichever one you want.

Of course you're probably a dab-ham with cursor now. So you can stick with that if you like it, depending on how far through your quota you are.

## You will learn

- Understand the main ideas covered in **Setting Up a Full-Stack Project with GitHub Copilot & FastAPI**
- Follow the practical walkthrough from Week 1, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

But here I am in GitHub, and I've gone to my GitHub page. This is just my profile page. I'm gonna go up here to my avatar menu and select co-pilot settings to look into this.

Now I am on the co-pilot pro plan and you might be on just the free plan that you remember, it has a certain quota of requests that you can make. This has a larger quota and I could have a I could pay more and have an even bigger quota. But as I am right now, I have used 1.4% of my premium requests and it resets monthly.

And yeah, so that's gonna be what I can consume. And it tells me here that it's enabled to be used in github.com, in a CLI, or in the IDE, which is where we have been using it and where we will again today. And there's also here options to select, to turn on and off different models and so on.

So it's worth looking at the different settings that you've got here. And most importantly, keep an eye on usage. This is where you can see what you're using according to your plan.

So that's one thing I wanted to show you. I also wanted to show you something that will be linked in the resources, which is the repo that we'll be using. It's a repo called PM, it's private for me right now, but it'll be public by the time you see it, I hope.

And it's the usual story. I'm gonna ask you to come to this green code button and just on usually select HTTPS and copy that to the clipboard. You don't need to do this because it will also be in the resources, but this address here, which is the address of this repo, that's what we will clone to get started with this project.

And so here I am in VS code. Remember this similar to cursor. This is the welcome screen and I'm going to bring up a terminal by pressing control back tick and up it comes.

There is a terminal also of course on the view menu, you know this now. And I'm going to go into my projects directory CD projects. Look at where I am PWD is where I am.

I'm in user Z projects. So yours might look different but that kind of idea. And I'm now gonna type git clone and then the link to that repo that's called pm.git or you can just take this entire command from the course resources.

That's what you do next. I'm not gonna run that because I've already done it. I've already got a pm directory, look, if I do cdpm, I'm in it right now.

And that is where you will hopefully be able to go into as well. Now let's open that project. And so to open the new project, you can go to the farm menu, new window, or you can just press open right here.

And then just find your way to your projects folder. And then find your way to PM, which should have been cloned, go into it, press open. That's the way to do it.

You know you're in the right place 'cause PM appears here. Do you trust the authors? Yes, if it says, if you get that, then yes, you trust me, right?

And now we are in PM. Here we are. We've got ourselves everything set up.

Now, you may have on your mind that you don't like the fact that I brought you into an existing repo. You might be thinking, I'd rather build everything from scratch, but I have a reason for this. Sometimes we'll build everything from scratch, but sometimes we won't.

And here's why. The thing is that building things from scratch is actually much easier with vibe coding, with agent coding, because agents are great at building things from absolute nothing. They're able to build all the scaffolding themselves, they're able to set up all the right files, they're able to take it through step by step.

It's actually harder when you're starting with something. And one of the hardest is when you're starting with a large legacy project, which we will cover at some point in our journey. But for now what I wanna do is a little mix up in that there's gonna be some code that we're inheriting as part of building this project.

And then something new that we're gonna be building, most of it will be new, but there'll be something here already. And what is that thing already you're wondering? Well, you're gonna be building.

Most of it will be new, but there'll be something here already. And what is that thing already you're wondering? Well, you're gonna love this.

### Deep dive

What we've got already is the Kanban front end that Codex made earlier this week, the really cool Kanban view. I'm gonna pretend that that wasn't vibe coded, just that we've got that here, that that's been built by somebody else, by another team, that MVP is already being built as a front end. We know it was vibe coded, but we're just going to pretend we've inherited it.

We've got that, and our mission is to turn this into an application with a proper front end, backend, database, API, with everything together. So this could actually be a project management tool that would be persistent. That's what we're going to build.

We're going to turn this into the real deal, and we're going to do it with LLMs. And actually, what I say we're going to do with LLMs, I mean that in two ways. We're going to use, of course, the coding agent to write this, but also, we're going to build a project management app that has an AI feature.

Because doesn't everything have an AI feature these days. It's going to have a chat with my project ability that you'll be able to ask questions about the project setup. You'll also be able to ask for things to be done to the project through an AI chat interface.

We're going to build an AI application as well. Well, I hope you're excited. I certainly am.

OK, so let me just take you through the file system here on the left. But I do also want to remind you a few things about actually using GitHub co-pilot here on the left. But I do also want to remind you a few things about actually using GitHub Copilot here on the right if you've forgotten.

We've got this agent drop down here that let's just choose the mode we're working on. We've got the model selector where we can choose which models we want to have with a manage models button that will bring up this whole section with all of the details of the models. This is also where you could choose if you want to be working with free models to be using a llama locally and running a model on your local machine if you've got strong enough local machine and you can run it for free.

And remember to look at the course resources for more on that. But if you're looking at using co-pilot properly, then also down here, remember this thing here gives us a sense of how much room we've got. And you can see that the premium requests, I've not used up many of them and they reset quite soon for me.

And you can press this manage paid premium requests and it will open you up in GitHub. And this is where you can set your kind of budget limits and things like that, should you wish to go over the allotted, the free portion that you get automatically. Okay, so that's just oriented you over there on the right.

Now I want to orient you on the files on the left. What is set up for you right away? Now what I've got here is, first of all, a directory structure.

Frontend is where we've got the existing Kanban MVP. Backend is empty except for an agents.md that is empty. It says this will something will go here.

Front Scripts is also empty except for something that says things will go here. I've got the.env file, which is the same one as before. I just copied it across.

You should be able to do that too, or if you want, you can create a new one. Remember, open router API key in block capitals, paste in the key if you're going to create it from scratch. No mistakes allowed, but you could also just copy it from where it is somewhere else.

Be careful with that.env file. The.getignore file is actually one of the defaults. It's got all the sorts of stuff you typically want to ignore, including the.env file that you never want to check into Git.

And then last but very much not least, I have prepared an agents.md file to walk you through right now. That is positioning us for success. That is where we begin.

And you shouldn't feel like you have to use what I've got right here. I'm doing right click and open preview to bring it up, looking fancy. Don't feel like you have to do this.

You can take this in whatever direction you want. I just wrote this right now. So this isn't like I sort of spent ages preparing it, but rather than you sitting there, well, I type it, I just did it quickly.

And this is what I've gone. I've tried to be reasonably scrappy because we want the agent to go with us on this. So we're building a project management MVP web app.

It is a user should be able to sign in. When they're signed in, they will see a can band board representing their project. It has fixed columns that can be renamed.

### Putting it together

The cards can be moved. There is an AI chat feature in the sidebar. The AI is able to create, edit or move one or more cards.

Limitations for the MVP, there will only be a single user sign in, hard coded, a user and password. But the database should support having many users for the future. There will only be one camera board per signed-in user.

We're not going to have lots of different boards. And it's going to run locally in a Docker container for the MVP. We're not going to deploy it out somewhere.

That's not to say that you can't easily do that. Technical decisions. So this part I have written based on my opinion, my technical opinion.

And you will be absolutely fair to say, okay, but how are we to know what to put here? And the answer is, you don't need to know what to put there because you could just ask an AI, you could just ask the agent, I was gonna say the cursor agent, the GitHub Copilot over here to do it for you. Now I have a viewpoint, I want a next JS front end because I want to show that to you and because that's what we've already got.

I want the Python backend to be fast API. Python is what I do. So I know that stuff well.

So I have opinions on this. I want everything packaged into a Docker container that makes most sense for us right now. I want to use UV as the package manager.

And honestly, these agents don't like to do that. They like to use simpler things. The usual pip.

I like UV because I love UV. And so I want to use it. You don't need to if you don't want to.

I want to use open router for the AI calls, because that makes most sense for us. I'm telling it. The open router API key is in the.EMV file and the project route.

I'm telling it the model I'd like to use. You can use the free variant. You remember, it's just got the word free after it.

Colon free, I think. Colon free if you want to use the free variant which you'll find in the open written website or you can use whatever model you want. And I'm saying I want to use a SQL like local database for the database.

Of course, there are many other ways of doing it. If you, for example, have a super base account where you've got already data, the ability to have databases running on the cloud, you could instead just put your super based keys in the.env. It will all work great.

That works too, but we're gonna keep it super simple for this. And then current state, a working MVP of the front end has been built and is already in front end. This is not yet designed for the Docker setup.

It's a pure front end only demo. She can't say it's a bit awkward there, isn't it? Why don't we call that starting point?

That seems more clear. Otherwise it's only gonna get confusing when it sees that that's not the current state later on. So let's say starting point.

Okay, and then I've got the same color schemas before, the coding standards, I think this is basically the same as before, I might have maybe added the fourth one here. When hitting issues always, I don't know if I root cause do not guess, prove with evidence, then fix the root cause. All just standard stuff I like to use, but increasingly it's not needed.

And then finally, working documentation, all documents for planning, oh, typo.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

But here I am in GitHub, and I've gone to my GitHub page. This is just my profile page. I'm gonna go up here to my avatar menu and select co-pilot settings to look into this.

## Practical tips

- Now I am on the co-pilot pro plan and you might be on just the free plan that you remember, it has a certain quota of requests that you can make. This has a larger quota and I could have a I could pay more and have an even bigger quota. But as I am right now, I have used 1.4% of my premium requests and it resets monthly.
- And it's the usual story. I'm gonna ask you to come to this green code button and just on usually select HTTPS and copy that to the clipboard. You don't need to do this because it will also be in the resources, but this address here, which is the address of this repo, that's what we will clone to get started with this project.
- And so here I am in VS code. Remember this similar to cursor. This is the welcome screen and I'm going to bring up a terminal by pressing control back tick and up it comes.
- Now, you may have on your mind that you don't like the fact that I brought you into an existing repo. You might be thinking, I'd rather build everything from scratch, but I have a reason for this. Sometimes we'll build everything from scratch, but sometimes we won't.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

All documents for planning and executing this project will be in the docs directory. Please review docs, plan.md document before proceeding. What is this document you ask? Let's go look at that next.
`;export{e as default};