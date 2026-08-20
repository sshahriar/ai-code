var e=`# Setting Up Claude Code Agent Teams for Full-Stack Development

> Week 3 · Day 4

## Overview

Welcome back to VS Code. We're going to start by cleaning things up so we're in great shape.

I want to just check what's in dot-claud. You can see that we have agents as empty, commands as empty skills.

We just have our cerebras skill, which is great. We want to keep that.

## You will learn

- Understand the main ideas covered in **Setting Up Claude Code Agent Teams for Full-Stack Development**
- Follow the practical walkthrough from Week 3, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

settings.json is empty. settings.local.json says what it's allowed to do. Okay, and the sandbox is currently off.

That's good because we want to keep everything as vanilla, as simple as possible. .github contains the actions, if we wanted to tag Claude, that's fine, we're not going to be doing that right now. Okay, we've got the market data summary at this point, that's great.

I also want to go into Claude and find out what kind of plugins we have enabled, what MCP we have enabled. We want to make sure that everything is nice and vanilla Because we don't want to confuse things if we're gonna go crazy with agent teams So here we go bring up a terminal and we will go into Claude here it is let's just have a look at the plug-in situation see what we've got installed right now We've got no plugins or mcp servers installed. That seems pretty good.

Okay, let's go back Let's go into skills. So I need the slash skills. See what we've got.

We've got the one skill, Ceribris inference. That's it. Love it.

And let's go into MCP. See what we have in our MCP servers. No MCP servers as we just saw.

Very good. Okay, we are now going to install a few plugins that might be useful for our agents to have. And I want to avoid plugins that themselves spawn sub agents, or we're going to lose control.

So I'm going for the simple ones. I'm not going for the really sophisticated ones, like featured there or something like that. So we go back to plug-in, let's take a look at them.

So frontend design is one that just adds some information so that it makes production grade frontends that don't have that characteristic LLM look and feel. And so I think this is a good one for us to have. Let's put that in in the project scope.

So I will do that. We will press enter and we've installed that. And let's go back to plug in again, see what else we could have here.

So context seven, we know that that's great. That adds all information about current APIs. Let's add that in as well.

So we will do that. We'll also install it in the project scope. And then just one more plugin.

Let's add. So the code simplifier seems like a great thing to have. But again, I feel like that's gonna be installing a sub agent that's gonna be too confusing.

And I just think I might want to include this playwright one, which is going to allow the agent to be able to spawn a browser and run playwright tests, which is pretty cool. So I do want to install that one. Let's do that for collaborators on this project project scope.

Okay, so we do now have those plugins. You remember we need to restart Cloud Code for those to take effect. But first I'm going to come out of here and I'm going to go to the Cloud.md and just get a sense of where we are with that.

Make sure that we're happy that this is giving us the full layer of the land. So it's saying that the document is planned.md and included here. Let's just add to this now to give it a bit more context.

### Deep dive

Okay, so I'm coming into claw.md. I'm going to take that sentence there and replace it with this. The key document is plan.md, including full below.

The market data components already completed. It's summarized in this file with more details in that folder. Consult these docs only when required.

The remainder of the platform is still to be developed. So that shows you the key distinction between using the at tag that will insert the entire contents of plan.md in context versus giving a link like this, which is giving it like a path. We should probably put this inside single ticks so that it knows it's like a path like that.

Like that. And now it's going to look into these only if it needs to. It's a bit like the way that we build skills files.

It means that it's going to only progressively add these to the context when required, naturally. Okay, I would say that's enough for the updated claw.md. Okay, and now just some quick git housekeeping.

I'm bringing back up my terminal. Let's come out of Claude code, just clear the screen. I'm just going to do a quick git status to see where I am.

Great. I'm going to check everything in. I'm going to do a git commit, git commit and call it ready for teens and git push.

Okay, that all those changes are now committed and done. And we are, we have a good baseline point that we can use for going crazy. Okay, we're now going to create a separate branch in git so that we can work off to one side in case we need to come back here easily.

So I'm going to do git checkout minus B agent teams, a new branch called agent teams, switch to a new branch agent teams. If you need to know more about Git, look at the resources for that. All right, and now we are going to change our settings.json.

Are you ready for this? I'm adding into the settings.json some more settings. Let's have a look.

Missing a comma there that I will, that was wrong in the slide as well. You may have noticed that missing a comma, obviously I will add that in. So yeah, this is now saying we want an environment variable, Cloud Code Experimental Agent Teams to be set to one.

The team mode is going to be in process. Save that. Okay.

So we are now ready to go. It's when we start Claude, it's going to start in this mode. Hold on to your hat, let's do this.

Okay, so in I go into Claude, here is Claude, everybody, Opus 4.6, we hopefully have our settings done, we are ready to go, we're ready to do the command that's going to kick off our team. Well, actually, let's just quickly do a slash usage to see where we stand. We can come back to this.

We've currently got 0% usage just as of today's quota, and I'm at 8% of the week's quota. I'm going to write that down. That's for all models.

So it's 0%, 8% and 2%. percent, eight percent and two percent. Okay, that's interesting.

### Putting it together

We'll see where this ends up being. And let's also do slash context to see how we're looking at the context. You'll see gosh, there's lots of playwright related tools.

I'm wondering whether that was a mistake to add that in, but it's only a couple of these. And then a lot of memory used up from from our plan, which is good. Excellent.

I think we're ready to go. Let me paste in the command. I want to create an agent team to build the entire project.

Team members, I'm specifying you don't need to. You can let it choose its own, or you can choose them by stating them. A front end engineer to work in the front end, a backend engineer, a database engineer for all database code, an LLM engineer for the calls, the LLM's hopefully using this some rebrass skill.

And all engineers should work on their unit tests, but there should also be an integration test there and also a DevOps engineer for the Docker container. Now I was tempted to also add in a code reviewer agent to check that code is simple and clear and give feedback back to the agents. But on reflection I feel like that might be a step too far in terms of just too much noise, too much chatiness between the agents.

We're introducing something which is which is going to require conversation with every single agent and more backwards and forwards, and I feel like that's going to just add more noise than we would like. So that's probably probably going too far that way. Anyway, that's that's why I made this decision.

We're going to give it a try and we know we might have to do this several times over to get it right. Before I kick it off, I'm going to shift tab to go through the modes, except edit on plan mode on. We want to accept edits on.

And then I'm going to kick this off. Here we go. Off it goes, accept edits on.

I think I remember that shift tab should also well let's watch what it does It's starting by exploring the current project state then it's going to create the team and then the tasks Exciting I am a bit anxious. I have to a bit Now I thought that shift tab was also supposed to put on delegate mode. Let's see no It's just I'm just gonna leave it on on this except edits on just I'm just gonna leave it on on this except edits on.

The anthropic docs might also be not always completely up to date so I don't know whether to take it with a pinch of salt. Okay so it's still exploring the states. We're waiting to see once it's done there, if it's going to then launch all the teams in which case I've got my fingers ready to do shift up and down so that I can flip between the different agents.

It's keeping on going. I think I'll probably put you on pause and come back in a second when it's starting to spawn the team. Okay, it's all happening.

It took about five minutes to think things through, and now it is spawning team members, and you can see that there is a DB Engineer and a front-end Engineer happening. The DB Engineer is already building a SQL light database layer, there's stuff going on. I need to make this bigger to see what's going on here.

Lots happening. Team is launched. Here's the current setup.

Database engineer, front end engineer, and then back end LLM DevOps and integration testing are all waiting on other tasks. I guess it's, oh yes, look at that blocked bias. It's got like a little dependency project plan going on.

Now let's just try pressing shift and up and down and see what happens. I probably have to be clicked in here, shift up. Now there we go.

This is how I can, you can see that it's flipping between team lead, DB engineer, front end engineer, and hide.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

settings.json is empty. settings.local.json says what it's allowed to do. Okay, and the sandbox is currently off.

## Practical tips

- I also want to go into Claude and find out what kind of plugins we have enabled, what MCP we have enabled. We want to make sure that everything is nice and vanilla Because we don't want to confuse things if we're gonna go crazy with agent teams So here we go bring up a terminal and we will go into Claude here it is let's just have a look at the plug-in situation see what we've got installed right now We've got no plugins or mcp servers installed. That seems pretty good.
- So frontend design is one that just adds some information so that it makes production grade frontends that don't have that characteristic LLM look and feel. And so I think this is a good one for us to have. Let's put that in in the project scope.
- Okay, so we do now have those plugins. You remember we need to restart Cloud Code for those to take effect. But first I'm going to come out of here and I'm going to go to the Cloud.md and just get a sense of where we are with that.
- Make sure that we're happy that this is giving us the full layer of the land. So it's saying that the document is planned.md and included here. Let's just add to this now to give it a bit more context.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

This is how you can flip between them and look at each one and what it's doing. And they are all on the go. Everything is happening. Only only three so far, the lead, the DB and the front end, but I imagine many more to come very shortly.
`;export{e as default};