var e=`# Building a Kanban App with the Cursor AI Agent in YOLO Mode

> Week 1 · Day 3

## Overview

All right, we are looking at the right hand side of the screen at the agent. And the first thing I'm going to ask you to do is to hover over this area here and drag it to the left because we want a nice big display here because we are going all in with our agent.

Next up, if you look here, this is the model that we're going to be using. If you click here, I'm going to leave it in auto mode.

Auto mode, if I turn off, you can see we can choose different models. I'm going to leave it in auto mode.

## You will learn

- Understand the main ideas covered in **Building a Kanban App with the Cursor AI Agent in YOLO Mode**
- Follow the practical walkthrough from Week 1, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

It may be that that's all that you have access to from the plan that you're on. We're going to let Cursor decide what it wants to do. Go into the unknown.

All right, and now over here, in the agent dropdown, I want you to select plan. That means that we're putting the agent into planning mode. And this is going to be, I think consistent with all of the tools we'll look at this idea, not all of them, almost all of them.

We put it in plan mode that's gone in different color. It's now in planning mode. And I'm just going to type in here, go ahead and plan.

I don't need to tell you what it's planning because it will load agents.md into context, always by default, and you can see stuff is happening, it's reading, it's thinking, things are all happening. While they're happening, move your mouse down over here and have a look. You can see that it's going to tell you in that circular thing how much of the context is used up.

How much of the context window has been consumed by the thinking so far. And you can see that 6.4% has been used. It also mentions that the active rules, the things that it's loaded in includes agents.md, which is the file we've got.

Excellent. Things are happening. But more than that, we can also see that it's created this document here, the Camban MVP implementation plan.

And if you scroll down, you can see that there's a whole lot of stuff here. There's different phases, phase four, drag and drop, phase five, add cards, phase six, there's lots of phases, phase eight. And then there's an architecture overview with some diagramming here and some suggested layout, out of scope and execution order.

So there's a whole lot of stuff in here, which is really interesting. And of course, the right thing to do now is to work through this document, read it carefully and be giving the agent feedback on things, on where you disagree and where you agree and so on. But that's for boring people.

That's not what we're going to do. We're just going to trust it. I'm not even going to read it, but you probably should.

But I'm not going to, I'm just going to go ahead and press the build button here, which is saying I'm just going to go right ahead and get started with this, and off it goes. Now, because I put it in Yolo mode, it's just going to go and do its thing. For you, you may need to be approving as you go, and we're popping things up that you might need to accept as they go.

But things are all happening for me. Files are appearing. It's just created a doc, it ignores, it's created a front end, directory, stuff is happening.

Also keep your eye on this context used over here. It's now at 10.7%. You will see as things happen that that context is being used up.

And look at all this. I'm gonna make this a bit bigger again. So we have this front end center.

Stuff is happening. Watch it happening and enjoy this process. Enjoy the sensation of having your AI agent at work for you.

### Deep dive

So for me, it's now been going for five minutes or so. And I have to say, I'm enthralled. I've seen it like finding a problem and fixing it.

I've seen it almost debating with itself about things, watching this reasoning happen. If you remember that trick that I covered yesterday, it's so interesting to see everything happening. And I'm watching here.

The context is now 28.8%. You're probably seeing that too. Keep an eye on that.

Keep an eye on everything that's happening. Something just failed there. Delete test fails.

So it's running tests. It's seeing them failing. It's coming back and fixing them.

This, this is the closest, the best way that I can show you what an agent is. Remember, it's an LLM in a loop with tools to achieve a goal, and you can see all of those happening right here in front of you. Okay, okay, it just finished, it claims it's run the tests and when it finished this popped up like it actually launched it itself now I've run this a couple of times in the past and sometimes it doesn't launch it itself It just gives you instructions But in this case it has actually opened this up and run it itself And as it tells me at the end here It summarizes that all of the phases are complete and it tells me what I have to do now I just simply have to go to look at this server myself directly.

It is running, it says, and that is what we're going to do right now. Okay, so you may have needed to go to bring up the terminal and do a CD into front end and then do npm run dev. And it should have told you exactly that command, but it already ran that for me, so I don't need to do that.

I'm now going to go to visit this, and I know that it's running on local host port 3000. And, bam, here it comes. First of all, this is a cam band.

It has appeared, and it has a backlog to do in progress review and done, and we can see it there. Look, it's got the nice highlighting. There is some node issue that it's complaining about but will ignore that.

I can see this little drag handles right here and I'm going to try doing some drag and drop. So I'm going to click there, I'm going to drag that over here and let go and sure enough it moved over to that column. Fair enough.

I'm going to try adding a card. This is a card and this is its description. Let's see, add.

And there we go. It's the head. That's great.

It's, let's, let's, let's try deleting a card. We'll delete this one up here, delete and it's gone. Wow, it is, it's working.

And we'll check that we can rename a column. That's not bad. We'll say not bad to that column name.

### Putting it together

There we go. So it does appear to be meeting art requirements. And this is, this is like brought it up.

I didn't give it any feedback. Now it may not have worked for you first time. It might be janky.

One of these times that I tried it actually didn't come up at all. You simply have to give it the feedback. Go back and say the following isn't working.

And you can see here that this is fine, but this is not, it's a little bit weird and that drag a drop. And I also, I don't think I can move this down. I can't reorganize here.

And there's that issue over there so it's not perfect and so these are all things that we could give it feedback to see how it improves. So we can give it some feedback. We could try that right now.

I can I can say it's mostly working nicely but next JS is showing that there's one error red symbol at the bottom of the screen. Also, the drag and drop is a bit janky and it's not possible to reorder within a column. Can this be made more slick?

Also it would be nice to have more yellow and purple on the screen. Let's say that, let's give it a few things, a little bit of feedback. We'll let it go off and do its thought and I'll see you back in a second when it's had a stab at correcting for that.

Okay, so it has finished, it has declared victory, I can see, but we'll be the judge of that. Let's have a look at it. Here it is.

Okay, so first of all, first of all, let's agree that it's done a fine job with the colors. It's definitely added some purple and yellow. Congratulations to it.

I can see that it has not succeeded in closing this issue. Interestingly, I think it did fix it while I was watching it. Then it somehow has re-introduced.

I don't know how that happened, but the issue is still there and it's still the same one. But this looks really nice. I note that we can now and we can drag things over here and it will come into this box here and you can now reorder them.

I can move that up which is really neat. So it's all working pretty well. Just still got this issue here, but the look and feel is great.

You can now reorganize within it and if you're having a similar experience, you can keep hammering away with this it. And if you're having a similar experience, you can keep hammering away with this issue. But as far as I'm concerned, this is good enough for Kessa.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

It may be that that's all that you have access to from the plan that you're on. We're going to let Cursor decide what it wants to do. Go into the unknown.

## Practical tips

- I don't need to tell you what it's planning because it will load agents.md into context, always by default, and you can see stuff is happening, it's reading, it's thinking, things are all happening. While they're happening, move your mouse down over here and have a look. You can see that it's going to tell you in that circular thing how much of the context is used up.
- I've seen it almost debating with itself about things, watching this reasoning happen. If you remember that trick that I covered yesterday, it's so interesting to see everything happening. And I'm watching here.
- This, this is the closest, the best way that I can show you what an agent is. Remember, it's an LLM in a loop with tools to achieve a goal, and you can see all of those happening right here in front of you. Okay, okay, it just finished, it claims it's run the tests and when it finished this popped up like it actually launched it itself now I've run this a couple of times in the past and sometimes it doesn't launch it itself It just gives you instructions But in this case it has actually opened this up and run it itself And as it tells me at the end here It summarizes that all of the phases are complete and it tells me what I have to do now I just simply have to go to look at this server myself directly.
- It is running, it says, and that is what we're going to do right now. Okay, so you may have needed to go to bring up the terminal and do a CD into front end and then do npm run dev. And it should have told you exactly that command, but it already ran that for me, so I don't need to do that.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

It's done a fine job. We have, we've looked at writing good agents.md and some of the tricks. We've looked at putting it on YOLO mode, running it, giving it some feedback and iterating. And we've just got a really good sense of what it's like to work with the cursor agent on building out a piece of software like this Canban project manager.
`;export{e as default};