# Building Custom Claude Code Plugins and Marketplaces

> Week 3 · Day 1

## Overview

And last but not least, we're going to cover creating your own plugin. Not a common thing to want to do, but good tonight.

You can good to have seen it. If you work in a larger team, it can be super convenient to have a few plugins that you've created for your team to work with, in which case you'd be able to create them all, you could even make your own marketplace to be used inside your company and then others with Claude Code can can add that marketplace to their marketplaces, and then you can just pick and choose from the plugins that are available.

It's a pro feature. It's nice to know you've got it.

## You will learn

- Understand the main ideas covered in **Building Custom Claude Code Plugins and Marketplaces**
- Follow the practical walkthrough from Week 3, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Let's make a plugin right now. Okay, and I'm going to call it independent reviewer because we're going to use codecs. Maybe you'll do it some other way, but it's going to be something that can do an independent review of changes.

And you start with a new folder, just a new dot-claud, just a new folder, it could be in a different repo altogether in your own marketplace repo. I'm gonna have it right here, and I'm going to call it independent, and spell it right, independent reviewer. Like so, that is our new folder, which is where it all begins.

And within this, you then make a new subfolder, a new subdirectory inside here, which has a special name of dot-clawed dash plugin. That is the sort of the fixed name you have to have for the directory, which contains some important config. And in particular, we're going to make a file in here that's going to be called plugin dot-json, which is the sort of the manifest, the description of what it is that we're doing here.

And you just have to know it has to be called that and it's of course in the documentation very clearly explained. That's what it has to look like and it has a particular format and which is the format that we will follow. Okay, and this is the structure of it.

It is a JSON dictionary with a name, which is independent reviewer, in our case, a description, which is to go out an independent review of all changes since last commit and a version number and that is our plugin.json file. All right, one more thing left to do. This top-level independent reviewer directory can have four subdirectories that contain information pertaining to this plugin and they are predictably enough commands that can have slash commands, then skills that can have skills.

And of course, agents that can have subagents and guess what else? Yes, hooks. So that's what we're going to create right now.

Create a folder called hooks. And this is where you can put hooks associated with the plugin. And within this hooks directory, you just need a new file that is called hooks.json.

It's as simple as that. Actually do try that again. Let's try that again.

New file hooks.json. It's as simple as that. I'll actually try that again.

Let's try that again. New file, hooks.json. And now all I do is I go to this settings.json.

It's this exact JSON. I'm going to cut it from there. We don't want it in both places.

I've saved that. I'm going to hooks.json, pasting it there. That is putting that hook in hooks.json right there.

And so now we have our Cloud, plugin, and our hooks. That's set. So now we've got our independent reviewer plugin, and we want to attach that to Cloud Code.

And there is a way to launch Cloud and tell it to use this plugin. But you can only do that for one plugin at a time, and it's not a very flexible way of doing it. The proper way is to create a marketplace.

You can create a little marketplace just for yourself. But then once you pushed it to get, the rest of your team could use it as well. Let me show you how you do it.

You create another folder which is a top level folder for this whole repository called dot-clawed-plugin, just like the dot-clawed-plugin that was within this particular plugin itself. And then within this, you make a new file, and the file is called marketplace.json. That's the name of the file that defines a marketplace.

And I'm going to paste in there some JSON that defines my marketplace called edTools. Name is ed, you could call this marketplace anything you want, but this will be mine. And I put my name and an email, and then a list of plugins.

### Deep dive

And there's one called independent reviewer. The code is at independent reviewer right there. That's what it does.

And this defines the plugin, the only plugin that is part of this marketplace, but I could have many. And this is the simple way to define a marketplace of plugins that you will make available to others. And once I've done that, I can then run the slash plugin command.

And when I do that, let me make this a little bit bigger, we'll have a look at how the marketplaces are now presented to us. So I go over to marketplaces and you'll see that the only marketplace that I have access to is Claude Plugins official. And I can go to Add Marketplace and press Enter.

And this is where you can select another marketplace to add in. It could be a marketplace that you've discovered from GitHub. It could be your company's one on GitHub.

It could be your one that you've discovered from GitHub, it could be your company's one on GitHub, it could be your one that you pushed to GitHub, or you could just describe it locally right here, which is what I'm going to do right now. I'm going to do dot slash, which means just my local directory right here. And when I do that, it's going to say that it knows about this.

This is now a marketplace. And you can see independent reviewer is the one plugin included in this marketplace, carry out independent review of all changes. Exactly what we wanted.

If I go over to marketplaces right now, you'll see that edTools is a marketplace that's been added to my environment, into my cloud code, and I can have many plugins that I've added in here. And so now I'm going to go back to discover, or no, sorry, I'll go to marketplaces, I'll go into edTools, I'll say browse plugins, here is independent reviewer that we're looking at right now. I can press space to say that I want to add that plugin to my current cloud code and press enter.

And I'll say install for the all collaborators on this repository, the project scope, I'll select that, and it's been installed. Restart to load new plugins. Excellent, let's do that.

I'm going to come out of Cloud Code. I'm going to go back into Cloud Code. Here we go.

And now let's do slash plugin to see what's installed. And these are not discovered, but go over to installed. Here we go.

We've got code review, code simplifier, context seven, front end design. And up here above all of that is independent reviewer that is installed which is a plugin from the ed tools marketplace it worked brilliant now let's see if that hook is actually active this is so cool I'm going to come come on in here I'm going to delete from here the read me, delete the read me, and also move to trash. And also let's open up the planning folder and delete the review, move to trash.

And now I'm gonna say please write a concise project, read me. And of course, what we're hoping to see is that this will kick off, that it will write a read me, and that is then going to trigger the plugin which is going to do a code review by launching codex behind the scenes, and all of this is going to happen. And we've seen now that it's still thinking, it's still working on the main instruction, we'll see how that goes.

Hopefully we're going to see a read me. We can be pretty confident about that. But perhaps the bigger task is whether we're then going to see the code review.

We'll say yes to this, yes. So it's written the readme. And now we're looking to see if it's going to call a stop hook.

It is calling a stop hook. That's great. And we know it's, we deleted the stop hook from the immediate.claw directory.

So it's not coming from here from the settings.json. That is empty. It is running the one that comes from our marketplace, from our plugin.

That plugin is being run. And any second now, we hope to see that we also have a review.md. I will see you in a second.

### Putting it together

Yes, indeed, we have review.md has been written and it has noted that there's a new hook that it's in this plugin and it's worried about possible recursive loop, but I think no such risk exists. But still, it ran, it created review.md, we've had success. So look, a lot just happened and I understand it's a lot to take on.

And really, I want to emphasize, if you know a lot about Cloud Code, then this might have been quite insightful for you. This might be stuff you could put into practice right away. But if you're still relatively new to Cloud Code, then just see this as a way to get a flavor for the kinds of functionalities that you can add.

You can make a directory that is your plugin. Within your plugin, you have a.Cloud plugin and this is where you put the JSON that describes what it does. You then have subfolders for commands, for agents that have subagents, for hooks and for skills.

And that is where you can figure all of the properties of your plugin that will be added in one shot when someone uses your plugin. And there is a way to just use just your one plugin when you launch Cloud. But the better way to do it is to create your own marketplace.

And you do that by creating a dot clawed plug-in folder and having a marketplace.json, which is where you list all of the plugins that are part of your marketplace. And once you've done that, you can simply go to the slash plugin in Cloud Code, include this marketplace and add on the plugins. Those are the steps that we carried out in order to add our own plugin right now.

Okay, look, we covered tons of ground today, lots of different things and probably you had spinning a bit with, "Okay, when do I use what, how does this all fit together?" Don't worry, as usual, we'll be going through this quite a few times, putting them into practice, and most of these are things that you will rarely use. It's good to know you've got them if you need them. Okay, just before we wrap today, I want to just summarize the pros and cons of subagents one more time.

So when you're thinking about using subagents as the way to add functionality versus things like skills and commands, remember first of all, it allows you to do more in parallel at the same time. You can have multiple subagents working together. They can be self-corrective.

They can not only allow you to do more at once, but they can also sort of have a negative feedback that they keep you more under control, doing a bit less. They can be very efficient for your context. It's usually the first reason you use subagents, is 'cause you pull stuff off the main context for Cloud Code, and they can be focused on one task that allows you to perfect the prompting, perfect the task at hand, do one thing really well and be really good at it, keeping again that kind of context of your main Claude code.

But with these strengths come a few drawbacks. So any time you've got this kind of ability to delegate to some other process, you're adding more moving parts. There's more complexity in your system, which means that more things can go wrong in a mysterious way that's harder to track down.

There are what are called boundary issues or problems at the interfaces between your sub-agent and your main agent that can result in mistakes. You can have this amplification of problems when you divvy up the task. Something can go a bit wrong and then agents go off in different directions and it gets more and more wrong in a way that's kind of hard to recover compounding errors.

And then also whilst subagents are sometimes touted as a way to save money because you can use a cheaper model to do some of your processing, they can also be a way that money can add up because you're just doing a lot more. You've got more churn, particularly if you've got the sort of self-correcting agents that are doing code reviews, doing document reviews, coming back for feedback. So more is going on.

Hopefully that results in better outcomes, but it might also mean that ultimately you spend more getting there. So look, needless to say, we're going to have more time to talk about this. I don't want to overwhelm you with these bits and pieces.

We'll go through some of this in a recap tomorrow. I also, with the plugins, I didn't mention how you put MCP servers in the mix as well. So I'll touch on that.

And things called LSP as well, which I didn't mention, which we'll get to too. But the main topic for tomorrow is sandboxing, which is such an important one, and also being able to run Cloud Code remotely. So a few juicy topics for tomorrow that rounds up the couple of yellow days.

And with that, that brings us to 73% complete.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Let's make a plugin right now. Okay, and I'm going to call it independent reviewer because we're going to use codecs. Maybe you'll do it some other way, but it's going to be something that can do an independent review of changes.

## Practical tips

- And within this, you then make a new subfolder, a new subdirectory inside here, which has a special name of dot-clawed dash plugin. That is the sort of the fixed name you have to have for the directory, which contains some important config. And in particular, we're going to make a file in here that's going to be called plugin dot-json, which is the sort of the manifest, the description of what it is that we're doing here.
- It's this exact JSON. I'm going to cut it from there. We don't want it in both places.
- Okay, look, we covered tons of ground today, lots of different things and probably you had spinning a bit with, "Okay, when do I use what, how does this all fit together?" Don't worry, as usual, we'll be going through this quite a few times, putting them into practice, and most of these are things that you will rarely use. It's good to know you've got them if you need them. Okay, just before we wrap today, I want to just summarize the pros and cons of subagents one more time.
- So when you're thinking about using subagents as the way to add functionality versus things like skills and commands, remember first of all, it allows you to do more in parallel at the same time. You can have multiple subagents working together. They can be self-corrective.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

We're entering the home stretch. Things are getting harder, but that's because we're doing so much more. And tomorrow's no exception. I'll see you then.
