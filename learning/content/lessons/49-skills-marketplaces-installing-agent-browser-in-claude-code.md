# Skills Marketplaces Installing Agent Browser in Claude Code

> Week 2 · Day 3

## Overview

So just as with the MCP servers, there are marketplaces for skills as well. But they're a bit more simplistic because skills are just a bunch of files and folders.

But to start with, the first place you might go would be to anthropics, GitHub repo, where they have a repo called skills. It contains the specification.

It contains a template. If you want to make your own, which we will do at some point, and it also has a folder of skills that they have written.

## You will learn

- Understand the main ideas covered in **Skills Marketplaces Installing Agent Browser in Claude Code**
- Follow the practical walkthrough from Week 2, Day 3
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

And it also has a folder of skills that they have written. And it has one of the first ones they produced, was one that allows you to create PDFs. They've got, was it the PowerPoint one, was one of the first ones they did.

But they've got some other useful ones here that you could look at. There's one that actually is a skill to create skills. So they've got these various things in them, and you can come in and you'll see that there is this file called skill.md, which I mentioned.

got these various things in them and you can come in and you'll see that there is this file called skill.md which I mentioned that is the main file with the metadata and the instructions. Those first two levels of hierarchy. While we're here we can just click in on one of them.

This is the metadata at the top, this is the name and the description and then this is the instructions. You can see it's just free form text with some stuff and then it's got some information about how it can look to more detail like scripts, executable code for tasks that blah, blah, blah, blah. And this is informing Cloud Code about the other, the other things in this skill creator folder like in this in this script folder that tell it how, what things that it can, that it can actually action.

So that's an example. It's a skill that is called Skill Creator. Let's look at another one.

Let's look at a skill that is called PPTX for PowerPoint. Let's open the skill.to MD. This is about presentation creation, editing and analysis, when Claude needs to work with presentations.

So this is telling it exactly when it should trigger this skill. And when Cloud Code finds that this is being asked for, it will read in this entire document. It will read in the instructions, the rest of this.

And you can see that there's lots of information here about what it needs to do. Lots and lots. Look at that.

It's a long document that would only get read in if this applies. And if we come back here, you'll see that there is also a scripts folder. And these are the different scripts that can run.

There's a JavaScript thing that can convert HTML to PowerPoint. There's various things. There's a rearrange Python script.

So these are all things. So this is a Python script that Cloud Code could run in order to, and it's got some usage here in order to rearrange some PowerPoint, the contents within a PowerPoint. That's what this script would allow it to do, similar to a tool, but at a higher level of granularity.

If this still is completely feeling real to you, then I would suggest coming to anthropics, GitHub repo, and I'll put a link in the resources, and browse around and try and get that first hand sense of what do these skills look like and what functionality do they contain. Okay, and the other website is called skills.sh and it's a great one. It's made by Versal, the people that are behind Next.js and that have the Versal deployment.

Great company and great product, great, great marketplace. Skills.sh is where you can come in to see a bunch of different skills out there and install them. And there are some really interesting ones.

There's one front end design that it's taking from the Anthropics website we were just looking at. A bunch of different skills that you can look at here, that somewhat in a sort of meta way, that the top skill is a skill designed to allow Claude Coe to find other skills, called find skills, which is kind of confusing. And there's lots of other things here.

It's a bit like we were just looking at the create skill skill. But yeah, there is the create skill skill that we were just looking at. Skill creator, a skill to allow Cloud Code to create skills.

But yeah, hopefully I'm not completely confusing you. There are some, there's, back to some ordinary skills, like a skill to, to, to create and edit PDFs, a skill to know how to do brainstorming. That's, that sounds like an interesting one.

So all of these are different skills that you can look into and equip your model to use. And look, this is a really powerful one, agent browser. If you come into this, if we're now looking at the skill.dot.md here, this is a really important one that allows you to equip Claude code so that it can run a browser, like launch a browser on your computer doing it what they call headless, which means you don't actually see the browser.

It launches and then navigate around. So rather than having to go off onto the cloud to do searches, it can actually navigate and do things. Claude Coke can have that ability.

### Deep dive

So that's kind of cool. And yeah, it's being given the ability to control it through another product called Agent Browser. So what we're going to do now is install this skill and Vassal has made a utility called MPX Skills.

You can just run MPX Skills Add and then give it a link to GitHub like this. And it will install that skill. And we are going to do that right now.

So I'm going to copy that to the clipboard. We're going to do that. And that's going to be the way that we add a skill to Cloud Code.

Okay, so first up, I'm going to come out of Cloud Code. I'll clear my screen there. And I'm just going gonna run a couple of commands that are gonna install this product called Agent Browser, which is like a headless browser.

And I'll put these in the resources, but this is, since we've already got node installed, you shouldn't need to install anything else. This has installed this thing called Agent Browser. And then if you need to install Chromium, the open source at the Chrome version that this runs, then you run this command here.

I say yes, and it's installing Chromium along this thing called Play Rights, which you may know is Microsoft's product that allows a code to drive a browser running on your computer. So that's all been installed successfully. The next thing I'm going to do is I'm going to paste to paste it in the thing that we just copied from that other screen from Vassell's skills list.

So here we go. I'm pasting in that command. You recognize it there.

Take it straight from that site using Vassell's skills utility. It's thinking it needs to install the following packages. Okay, proceed.

I'll say yes. That's fine. Okay.

Skills is installed. Okay. Okay, skills is installed.

Okay, now, it's saying to me, "Selected Skill Agent Browser." Which agents do you want to install it to? So what it's saying is that it's recognized that it could be installed to be used by something like AMP. Remember AMP that we used?

Anti-gravity, it could be used by Claude Code. OpenClaw, which is big right now. Maybe we'll talk about later, "Cline", "Covuddy", "CODEX", and lots more, including "Open Code", I believe.

So, if you've decided to stick with that, you can use that as well. And all we want is "Clawed Code". And the way you do that is you press the "Down" button, and you press the "Space" bar to select it like that, and you press "Enter".

And now we can choose, "Do you want it install for this project or globally? And all that means is do you want me to create these folders and files in your.Cloud file right here or in your home directory? And I'm going to say project.

It's already highlighted there. I can just press Enter. An installation method, this is you.

If in doubt, say copy to all agents. You don't know about Simlinks, we like aliases. Let's do that.

Proceed with installation. Yes, done. And it seems very high tech, especially as it was all on the command line like that.

But all it did is if I open up dot cloud, it has created this folder here, skills that just got created. That's why it's green. If I open that up, you could see that there is it's sorry within skills, there's only one folder, and it's called agent browser, which is the name of the skill that we just created.

### Putting it together

And that has this single file called skill.md and if I open that up in a preview mode so if you look at it, you can see that it is basically exactly what we were just looking at. Hang on and maybe I shouldn't show it in preview mode. If I show you the original version here, you can see that it's got this kind of header at the top with this particular format, three hyphens, and then this description right here is the metadata.

YAML people will recognize this. So it's got this particular format here with name and description, and then this is optionally which tools are allowed. And then, yeah, we've got, the rest of this is the information that is only read into context if Claude code decides that this is met.

So just by virtue of having these folders and files, we have effectively equipped Claude with a skill. There's nothing more to it than that. It's just about the files in this dot Claude directory.

And so finally, I can launch Claude, up comes Claude. Here it is. I can look at the context.

If we look at the context, we can see that we have underskills Agent Browser. It's easy up just a tiny 68 tokens, but Agent Browser is there. And so now I can actually use Agent Browser.

And now this is a definite example of how you need to be-- it's difficult to make it use this, because generally, Claude does have the ability to search the web from its tools. So we'll see how this goes. We'll say, please interact with the browser restaurant experiences in MOC next week, perhaps on resi or open table.

So we're giving it a sort of broad task again, it's not to do with coding but we're just seeing whether or not it's got this. But look it is trying to use the Skill Agent browser. The first time I tested this before, it didn't.

So you have to be careful that I'm using, you notice, the exact words from here. So I'm going to say yes, and it is now going to be behind the scenes launching Agent browser. It's looking at resi, it's running, it's looking at resi.

Oh, and the browser window has actually come up. There's, I think, some control somewhere where you set whether it should be headless or not. And obviously it's set, so I thought it would be headless.

But it's cool that you get to see it. So we see it running, it's doing stuff. That's a nice surprise.

Look, it's searching. I'm not, my hands aren't on the keyboard. I'm not doing anything.

This is Cloud Code driving this browser on my computer because of the skill that we equipped it with. They got a bit, it's pretty cool. It's continuing to search, and I could see, but you could probably see in the window behind that Cloud Code is doing stuff.

Things are all happening. All right, I'm going to let it do its thing. I'll see you in a second when it's finished.

Okay, that was pretty cool. It just searched around Rezi and then it searched around Open Table. It took screenshots, it then read in the screenshots asking me for permission and then summarised with some some experiences that are available.

And so there's no question. I say I'm not sure which setting it is that controls whether it's headless or not, but you definitely get that real sense that Cloud Code is in the driving seat using its new skill when you see that. So I think it's a really cool example for you.

It's not of course got much to do with coding, like you wouldn't need to look for a restaurant for its part of coding. But you can imagine things you might need to do that would need it to bring up a browser and do some searching. And that is the new skill that we've equipped Claude with so easily, literally just by having this bunch of files stored in the dot-clawed directory in this repo.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

And it also has a folder of skills that they have written. And it has one of the first ones they produced, was one that allows you to create PDFs. They've got, was it the PowerPoint one, was one of the first ones they did.

## Practical tips

- So all of these are different skills that you can look into and equip your model to use. And look, this is a really powerful one, agent browser. If you come into this, if we're now looking at the skill.dot.md here, this is a really important one that allows you to equip Claude code so that it can run a browser, like launch a browser on your computer doing it what they call headless, which means you don't actually see the browser.
- Okay, now, it's saying to me, "Selected Skill Agent Browser." Which agents do you want to install it to? So what it's saying is that it's recognized that it could be installed to be used by something like AMP. Remember AMP that we used?
- If in doubt, say copy to all agents. You don't know about Simlinks, we like aliases. Let's do that.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

And as I say, of course, the magic thing about having it be so simple is that I can now check this in and push it to a repo, like push it to GitHub. And any of my team members that pull it down will then do a git-pull, will also have this skill equipped in their cloud code immediately. Although they would also have to do that, that's a npm command to install the agent browser, they didn't have it. But you get the idea, these skills can be equipped have to do that that's a mpm command to install the agent browser if they didn't have it but but you get the idea these skills can be equipped that simply and that that is really why they're so popular.
