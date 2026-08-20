var e=`# Claude Code Autonomy From Jira Issue to PR via MCP Server

> Week 2 · Day 4

## Overview

Okay, so here I am back in Jira. Remember Jira, I'm going to create another issue, another work item, whatever they call it, a task.

What needs to be done? I'm going to describe a more sophisticated task than that simple website thing.

Let's put something in here that's some real functionality that we want to build. Okay, so I'm going to create a new task.

## You will learn

- Understand the main ideas covered in **Claude Code Autonomy From Jira Issue to PR via MCP Server**
- Follow the practical walkthrough from Week 2, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

And the task is going to be to create And the task is going to be to create a data set of legal document templates that the system will later be able to modify for the user. That explains what we need to do. There we go.

That is the item. Let's double click into it to bring it up and add some details. And first just to show you, we're going to be tapping into this resource by a company called Common Paper, which is a fabulous resource.

It is a set of repos that this company has, which contains draft legal documents like a mutual NDA, a classic document. And in each case, in these in these these repos they've got a markdown version of it, which is exactly what what LLM's love for these things, it's got a markdown version of it, and it's also they're all under the Creative Commons license, which means that you can use them and modify them for free, which is great. And so this is a good source of data for us for this project.

And that is precisely what I'm going to tell in the description of this task. The task is created data set of legal documentation, legal document templates that the system will later be able to modify for the user. And I'm going to paste in here some text that I just wrote.

So you don't have to watch me typing it. This task is a one time data curation project called a data curation task. It is to avoid getting confusing there to prepare data for the pre-legal project.

For context, the Common Paper GitHub account at, and then a link to it, contains a number of repos with legal agreement templates that can be copied and modified under a CC license. We will use this as the source of data. For this task, we will need to browse these repos.

We will need to pull down the markdown files, put in a directory called templates. Additionally, make a JSON file to describe the different templates that we've got, and finally put in a license file to recognize the license. Let me save that.

That is the description of the action. And I'm trying to do this in a way that perhaps could be something that your product team or business sponsor has put in. It's a task to be done.

It's something which is human understandable, it's quite high level and it will involve a number of different tasks. And in this case, it's like a one time task to retrieve data. This is something that we're going to want to give to Claude code.

And it's worth taking a look at this and seeing that it's called PL-2. That is the name of the issue. And now we need to go to Cloud Code.

But don't forget, we also need to install this mcp server and Cloud Code because we installed it just for the for the other project. And now we need to install it for this project. Let's go and do that.

And then let's keep this whole thing off. Okay, so here we are back in Cloud Code. I'm going to come out of Cloud Code, sorry, control C twice quickly.

And then I'm going to paste in the Cloud MCP ad. This is to add the Atlassian MCP server. It is added in there and now I go back into Claude and now I do slash mcp to take a look at our mcp servers and we can see that the Atlassian one is there.

It says that it's connected but I don't believe it we're going to reauthenticate. And so in we go I press enter. I am going to say reauthenticate, I am going to say re-authenticate, up comes a browser window, approve, and we're all, it's requesting access, accept.

### Deep dive

Authentication successful, you can go back to Cloud Code. So that is what we will do. Here we are, we believe that we are authenticated.

Okay, now we're not yet going to use that feature that we just put in next. There'll be a bit much to some architect and build and code review this, which is gonna be a one time data exercise. We're gonna use that next.

First up, we're just gonna try and say, please carry out Jira issue PL2 and raise a PR with your changes. Let's just leave it at that, giving it a nice high level task. And it's going to, for the time being I'm going to press 2, I'm going to say you can do what you want.

I'm going to let it go off and do things. It's getting an issue for PL2, you could see that, that seems good, we'll let it review what it needs to do. So the main thing to bear in mind here, it's trying to use the GitHub tool to read the common paper, which wasn't exactly the plan, but we'll see what it does.

Okay, that all seems fine. It's getting lots of things. Let's say, don't ask again, get file.

We'll let it keep going with what it's doing, with this access token. It's using the GitHub tool. I was thinking it would just browse the web 'cause these are all public files, but it's using this.

And off it goes. So much going on. Crazy, all right, it seems to be doing all the right kinds of things.

It's downloading stuff. The question is, is it going to be writing it here? We will soon find out.

I will come back in a minute when it's done its thing. I'm just gonna show you actually, I mean, it hasn't done its thing yet. It's like halfway through, it's got everything, using the GitHub tools, and it's now wanting to create the templates directory, and that sounds great, that's just what we wanted.

So I'm gonna let it do that. It's now created the templates directory, and hopefully it's now gonna be writing a bunch of markdown files that it is downloaded from the GitHub repo. I was thinking we'd use web searching for that.

It's used the GitHub tool. That's what autonomy is all about. We let Claude code do what it does.

And I will see you back here again in a second. continually completely astonished by Cloud Code. So what just happened while I watched, well, during that, that, break there was the second view of those five minutes for me, is that Cloud realized that the way that it was doing it, which wasn't what I was expecting it to do, was going to be too slow, it was going to involve bringing long files into its context, which wasn't a smart way to do it.

And so it downloaded a few documents, but it's come up with a better way, which is what I thought it was going to do originally, which is just run some commands to download them directly, and now it's asking me for permission. And that's just incredible. It's like it hit a roadblock, it figured out what was going on and how to work around that properly.

I think this is an example of the inflection point that we saw last November, where this kind of intellect wasn't possible before. So yes, I'm going to say yes, absolutely, it can do that and bam, all the files appear, which is what I thought was going to happen before. And it now has, has, has done a decent job.

### Putting it together

It's absolutely staggering. Claude code then went ahead. It did a pull request.

It first tried to use the GitHub command line tool to do it, which I don't have installed. That didn't work. And then it realized, oh, but I've got the tool through my MCP server.

So use the tool to make a PR request. And now when I go into GitHub at the pre-legal, I go to pull requests. There is here, add legal document templates data set.

I click into this, it's got all of these details that it puts, it says generated by Cloud Code at the bottom. These are the templates, this is the description. Let's have a look at the code that it wrote.

This is of course also sitting on my local box. There's one commit. These are the files that it changed.

It built all of these different markdown files. It also created a license.text, which I asked it to do, which describes the fact that this is a Creative Commons license, and it made a catalogue.json file, and that is something which I asked it to again in the Jura task, which lays out what has to happen. Absolutely amazing.

Now, back here in Clorco, though, it's struggling a bit. It's struggling because it realized that it would be nice for it to also update the Jura issue status, the market as complete, and it's been sitting there waiting on Atlassian, and I happen to suspect because I've seen this before that this happens because you have to continually re-authenticate with Atlassian. I've seen a lot of complaints about this in the community.

This is something that people know about and it just hangs Claude code like this. So what I'll have to do now is do an escape like this and I'm going to have to do /mcp and I'm going to have to come in and re authenticate against Atlassian before this is going to work. So here we go.

I select the Atlassian one I press enter I say reauthenticate it's then going to spin this up I say approve I scroll down I say accept it then says I can return to cloud code I bring back up cloud code and now I'm going to say please and now I'm going to say, please try marking the jira issue complete again. And we'll let it have a second shot at that to see if it works this time now that we've reauthenticated. But this is something I can see already.

It's already got passed where it was before. So that's something to watch out for. And this is a classic example that C transition commands that sounds fine to me.

It's a classic example of the slight flakiness of mcp which you have to have one one i open for and just to sort of try it again kind of line of attack is usually the one that works and check this out you can see here it's telling us it's done it's telling us about what it created and it's telling us about the catalogue.json and the license.txt and now with this we can just say that it says it's markpl2 as done I think we can probably merge the pr so I'll say please go ahead and merge the pr and also then switch the branch and switch the branch to main. Let's do that. Off it goes.

Oh, that's interesting. I don't have a merge permissions. So it's got to work around by merging locally and pushing to main, which is another way to do it.

Again, ingenious, absolutely ingenious.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

And the task is going to be to create And the task is going to be to create a data set of legal document templates that the system will later be able to modify for the user. That explains what we need to do. There we go.

## Practical tips

- So you don't have to watch me typing it. This task is a one time data curation project called a data curation task. It is to avoid getting confusing there to prepare data for the pre-legal project.
- But don't forget, we also need to install this mcp server and Cloud Code because we installed it just for the for the other project. And now we need to install it for this project. Let's go and do that.
- It says that it's connected but I don't believe it we're going to reauthenticate. And so in we go I press enter. I am going to say reauthenticate, I am going to say re-authenticate, up comes a browser window, approve, and we're all, it's requesting access, accept.
- Okay, that all seems fine. It's getting lots of things. Let's say, don't ask again, get file.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

So my fine token doesn't give us access to do that, but because locally we could do a merge and then push to Maine and that's how it's done it. Again, it's just phenomenal how Cloud Code is able to understand the reason behind problems and then come up with a rational solution to it. For all the times that I moan about how sometimes it jumps the conclusions and puts on band-aids to work around problems, sometimes it problem solves really effectively. And that's what we've seen today.
`;export{e as default};