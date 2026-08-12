# Building Step-by-Step with AI Copilot Planning & Scaffolding

> Week 1 · Day 5

## Overview

Okay, so I have this docs directory and I have a file called plan.md and here it is, high level steps for the project. I have got 10 parts of building this that I've written out.

Now, we didn't need to do it this way. We could have the LLM just write the 10 steps itself.

And that's very much a decision about whether you want to first have it do a high level plan, which is super common in these things. But I am quite opinionated on this and I wanted to set, I wanted to put it on guardrails and I recommend you do too, if you have opinions on this.

## You will learn

- Understand the main ideas covered in **Building Step-by-Step with AI Copilot Planning & Scaffolding**
- Follow the practical walkthrough from Week 1, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Let me take you through this plan and you'll see what I mean about how how simply I want to take it. Part one is itself plan. Enrich this document to plan out each of these parts in detail with sub-steps listed out as a check list to be checked off by the agent and with tests and success criteria for each.

Also, create an agents.md file inside the front end directory, there's nothing there, that describes the existing code there. Ensure the user checks and approves the plan. That seems like a really robust first step.

Second step, scaffolding. Set up the Docker infrastructure, the backend with fast API, and write the start and stop scripts in the scripts directory. This should serve example static HTML to confirm a hello world example running locally and also making an API call.

It's good stuff. As I say, and I'll write this for you if you don't want to do this. If you're a senior engineer, then hopefully you know where I'm coming from.

This is a very good methodical way to build slowly. The thing I have in my mind always is that if any one of these steps doesn't work, then I have a really good sense of how to dig in and figure out why with the co-pilot. And I always try and work that way.

Each step should be something that I know how to dig into that. Part three, add in the front end. Now update, so the front end is built and served.

So the demo cam bandboard is on display. Part four, the fake user sign-in experience. Part five, database model, set up the database schema, document the approach and get user sign off.

Part six, backend, add API routes so the backend can read and change the Kanban, test it thoroughly. The data risk should be created if it doesn't exist. And then of course, part seven, bring the front end and the backend together.

Now by part seven, we'll be able to use the front end to actually call the backend. We'll be able to move around cards on the Kanban board and the database will update. We should be able to log out and log in again and see it there.

See it remaining. And that will be cool. Part eight is the AI connectivity, a lot of backends to make an AI call via open router.

Test it with two plus two. Part nine is so that that simple plumbing is extended so that we could send the camban board, send a question and get back an answer and potentially a change to the camban. And finally, part 10 is adding a beautiful widget, supporting full AI chat and allowing the LLM to change the camban board.

That's the plan. Okay, so this is just the kind of preparation that one does to get things off on the right footing. Everything is tight.

We know what we want to do. You don't need to lay out the 10 high level steps like this. But if you know what you want, then you should.

But you could also have it come up with the high level plan. All right. And with all of this, it's time now.

I'm going to make this look nice and neat. Everything is, of course, at this point checked in and on GitHub. So we have a snapshot of the code as it is.

And one of the crucial points I'm going to be making to you is that when you work in this way, you go step by step, you're always checkpointing by taking like a, like a git commit at each point. So you can always walk back if you need to. That's always that option is always available to you.

And indeed, you should take it if you're not happy with where you get to. It's time for us to do part one. Okay, I'm gonna make the agent nice and big over here.

I'm gonna make sure I'm gonna go with the GPT-52 codecs. We've had a good run with this. It made the can ban front-end.

We should let it keep going. Okay, and now I'm going to say, please review agents.md and the plan and proceed. And let me know if you have any questions.

### Deep dive

That's the first way to start. And let me know if you have any questions. Do not do any work yet.

That's always a great way to start. Ask me to enable GPT 5.2. Ask me if questions is a great way to start.

That's a really good way of doing it. We've got lots of screens here. Okay, so it's got some questions.

Number one, do you want me to enrich plan.md with detailed checklist, tests and success criteria? Number two, should I create the front end agents as part of the plan enrichment or only after plan improvement? Number three, for comprehensive tests, you have a minimum coverage target or specific test types you want prioritized.

These all seem like they're easy questions. It hasn't found anything particularly complicated. 1.md, 2.

Yes, create agents.md integration testing. Go ahead with part one. All right, off it goes, off it goes.

Okay, so it's now going to go off and do this. And of course, as you can see, I'm just taking it step by step. I'm not in Yolo mode.

And so I'm here expecting to approve things and check things as they come. And I'm only going to ever give it permission to do one more step because we're doing it the proper way. We're doing it the slow, methodical way, which is the way to build bulletproof systems with an AI co-pilot like co-pilot.

I will see you in a minute. Okay, it didn't take long at all. And it's updated the project plan.

Let me make this screen a bit better sized for us. Here is the detailed project plan. And you can see it has indeed for part one.

It's put checkboxes by everything. And plan is detailed and actionable. Let's have a look.

We'll be the judge of that. So it's got a Docker file. That's what I like to see creating this, adding minimal read me notes.

It knows that I want it to be minimal. Ensure UV is used inside the container. That's correct.

Good. Set up scripts. Okay.

I like the fact that it's got some tests here. It's got a health endpoint. That's a nice, nice plan indeed.

It's got success criteria listed out here. I like that checklist here. And then front end, this seems good.

Yes, yes. Fake user sign and experience. Yes, database modeling, okay.

Create SQL light database, improvement crud end points, that's good. This all looks perfectly reasonable. You should be doing this too.

We're looking for any signs of anything that we don't like, but it all looks good to me. A simple endpoint, yes. Integration test that validates the two plus two.

### Putting it together

Okay, yep, that seems fine. And build a sidebar. Okay, this seems very good to me.

I think all 10 parts are understood. Now, we also want to look at the agents.md that it should have created here. And let's see, okay, good, it is indeed app router.

If you know about that, this all seems great. It's pretty short, but that's fine. Okay, good, good, good, good, good.

All right, I'm pretty happy with that. So we're going to say yes to approve this and move on to step two. All right, so confirmed.

Approved, proved onto step two. All right, which is of course the scaffolding. So we'll now let it do this and you should be doing the same.

And I realize it feels like, it feels like we're going in such small steps after we've yoloed yesterday. You're thinking, oh, why can't I just tell it? Do all 10 steps, just do all 10 steps.

I'll come back later. But the thing is, this is too big a deal. If we do all 10 steps, it will go off the rails and things will go wrong.

You could always try, if you want, if you want to be bald, you want to be brave 'cause you can always go back and get to where we were. See, for sure, you could just say, hey, let's do all 10 steps but I think you'll find as you and I will experience I'm sure we're going to hit some roadblocks along the way and if we just let it do all of its thing things would go awry. All right I'll see you in a second when we have our part two done.

Okay so it says part two scaffolding is in place. It's got a fast API back end it's got all of this. Now what I'm interested in is whether it has actually tested it itself.

I think it's just inspected. So that's no good did did you test part to yourself. Let's see.

No, I did not run test it. Please run tests thoroughly. Bring up the server.

tests thoroughly. Bring up the server, make sure it works, check the the the the the the roots, bring it down. Let me know when you are confident.

Okay, that's a great example. You see, I just wanted to move on. It just said two is done and it hadn't actually tested it.

The creative virtual environment. Why is it doing this exactly? This seems a bit strange.

Let's see what's happening here. I'm suspicious. I am suspicious.

I see a requirements.text. Okay, we'll let it do its thing. And yeah, we'll see where this goes in the end.

I will see you back here in a second. So it's been running various commands and I've been pressing allow, looking at them, understanding what it's doing. It's been stuck with some test failures and trying things again.

And now I know what these things are doing. So I know that they're safe and I've been allowing them.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Let me take you through this plan and you'll see what I mean about how how simply I want to take it. Part one is itself plan. Enrich this document to plan out each of these parts in detail with sub-steps listed out as a check list to be checked off by the agent and with tests and success criteria for each.

## Practical tips

- It's good stuff. As I say, and I'll write this for you if you don't want to do this. If you're a senior engineer, then hopefully you know where I'm coming from.
- This is a very good methodical way to build slowly. The thing I have in my mind always is that if any one of these steps doesn't work, then I have a really good sense of how to dig in and figure out why with the co-pilot. And I always try and work that way.
- We know what we want to do. You don't need to lay out the 10 high level steps like this. But if you know what you want, then you should.
- And one of the crucial points I'm going to be making to you is that when you work in this way, you go step by step, you're always checkpointing by taking like a, like a git commit at each point. So you can always walk back if you need to. That's always that option is always available to you.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

If you know it already, if you're someone that's, that's worked with this before, you can allow it. If you don't know, then you can get a sense for it. You can, you can ask chat GPT, uh, to, to explain what's going on, get, get a second pair of eyes, or you can deny, and then, and then just ask it to explain what it's doing and why. But this is, it's for someone, if you're new to this area, then not only is this important for you to make sure that you're satisfied with everything that's happening, but as I say, it's also this amazing learning opportunity to inquire and see what it takes to build this kind of software.
