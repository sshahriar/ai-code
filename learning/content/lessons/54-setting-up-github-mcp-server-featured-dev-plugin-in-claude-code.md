# Setting Up GitHub MCP Server & Featured Dev Plugin in Claude Code

> Week 2 · Day 4

## Overview

Okay, now I'm going to press the open button. You can also get to this by going file.

I go into projects. I go into pre-legal.

I say open. And now we have our new, our new open VS code projects.

## You will learn

- Understand the main ideas covered in **Setting Up GitHub MCP Server & Featured Dev Plugin in Claude Code**
- Follow the practical walkthrough from Week 2, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

We say, yes, I trust the authors. Here we go. We are in here.

This is the beginning of our new project. Okay, so I'm going to bring up a terminal again with command and then the the backslash. And now, And now we're going to install another MCP server.

And this time it's for GitHub. We want to connect to GitHub using GitHub's famous remote MCP server using the token that we just created and that you're taking great care to preserve exactly as is. Now you may wonder why are we using MCP servers directly like this when I just told you that the best place to start is with plugins.

And the reason is because first of all, these are two very famous MCP servers, Jura and GitHub that are very well known, very powerful and highly used in the community. And secondly, because they have these very particular authorization techniques and to do it, to go through that proper process, it is best to go directly through the MCP server. And that's why we're doing it that go through that proper process, it is best to go directly through the mcp server and that's why we're doing it that way.

Okay, so let's now connect to the github mcp server using our key. Okay, so I've pasted in here the command which is in the course resources and I close that so you can see it all in one line. It's uh hang on let me just delete that that's not necessary right there.

Here we go. This is the line that will be in the course resources. Cloud MCP ad, it's another remote MCP server, an HTTP MCP server, just like the Jira one was, the Atlassian one.

It's at api.githubcoapilot.com/mcp, and we're passing in a header, and in that header, we're putting the GitHub Personal Access token. But you can see what I've got there is some text and that's not going to work. I'm going to have to replace this right here with the exact key that I carefully copied with taking great care from GitHub, from that screen we were on just a few moments ago.

So I'm now off camera going to put in my private key in there that we took from there with these fine-grained permissions, put it in there and install this MCP server by running that just like this. And you should do the same. Okay, I've run that command.

And now we're going to start Cloud and see what happens. Do we trust this? Yes, we do.

Number one, here we go. We're in pre-legal. And we are going to do slash context to see what kinds of tools it has access to.

Let's take a look. And you can see it's got access to a whole bunch of GitHub related tools. Excellent.

Okay. Let's give this a whirl. Okay.

We're going to say please write an issue to GitHub to GitHub that to GitHub, that the README needs to be updated. Let's see how it does. It's hopefully going to use the tools.

It's first of all just running a local, and now it is, indeed, trying to use the create or update issue. Let's say yes. Do it not going to give it full approval to everything.

It's doing that. Created issue. All right, let's go and have a look.

Well, here we are in a browser window. I'm going to go to GitHub to the pre-legal, and here we are looking at the repository. Looks very similar to me.

But wait, there's an issue under issues it says one let's go and check this out update read me let's look at it the read me needs to be updated to reflect the current state of the project there we go so very nice we've just used cloud code to connect to github and raise an issue okay well let's just take it one step further please update the read me to reflect that the project is in progress and will be completed in one week. Then raise a PR for this to be merged. I don't know if we have enough permissions for this, let's see what happens.

### Deep dive

Let's see what happens, give it a try and we can get into some problem solving if it doesn't work. It's reading a file, it wants to make a change to the readme, that sounds fine, go for it. I pressed number two, it should have updated that.

And now it's going to check out and make a commit, that's all great, I'm fine with that, this is not using tools yet, this is just running git commands. We'll accept that. So it's just running that locally to make the commit.

And now it wants to do a push. Let's say yes. Okay.

And now it is looking to open a new pull request. Open a new pull request. This is using the tool.

Tool use, yes. Let's see if it's working. Done.

Created PR number two. There it is. Okay, let's go check this out.

Alright, I'm going to click on this link right here to a pull request on this repo. Click, up it comes, and here we go. We do indeed have a pull request.

I don't know why it's called number two, but experts will probably tell me why it's not number one, I mean. But here we go, it's got the summary, add status section to read me, indicated the progress in progress, generated with cloud code, it's put in here, which is really nice that it adds in that attribution. And then if we go to commits, we'll see that this PR includes the single commit to update read me with project status.

There it is, and it's here so that we could check this out and should we wish we could press merge pull request, which will have the effect of updating this. So hang on, if I go and look into the code right now, you should see that this is the code that we've got. We now going to pull request.

This is just standard GitHub stuff. We go into this pull request. We press merge pull request, confirm the merge.

This has now been merged, we go back to the code again, and now you could see the status is updated. That's cool. Now if some of that git stuff went over your head, then honestly it doesn't matter, it's standard set of git stuff, I'll try and put some good resources for you, or let me know if you'd like more about it.

If you're a seasoned git GitHub person, then you knew what was going on and you understand that's part of the typical workflow with a larger team and it's something that Claude Code can do for you. There's one little bit of housekeeping that we have to do now and then we can push on. If you bring up a terminal and you do a Git status, you'll see that we are in a branch origin slash update.

Read me and I'm just going to say, get, check out Maine. And that just switches us back to the Maine branch. We were on a special branch for our PR.

We're now back to Maine. Again, if you don't know about this kind of Git workflow stuff, then I'll put extra resources for you. But that's where we are right now.

We've got Git status. Here we are. We are now on Origin at Maine.

And we have our directory set up with our license and our README ready for the next step. Okay so we're back in Claude code again, I took Claude to bring it up. We have so far installed two mcp servers, a Atlassian Jiro one and a GitHub one and we've done them by going to the mcp server configuration directly.

We are now going to install a plugin. So do slash plugin to bring up the plugins and have a look at them. And you can see there is in fact a GitHub official plugin that you could also use.

### Putting it together

It's a slightly different auth approach where you have to put it as an environment variable, but otherwise it would work in much the same way. That's not what we're going to install. We're going to install a plugin called feature dev.

Feature dev is an official plugin from anthropic to guide Cloud Code through a disciplined seven stage process to build a new feature for your product. In some ways I think of this as like the polar opposite of Ralph Loops. Ralph Loops are all about chaos and just total autonomy and just go for it 10 times, see what happens.

The feature dev is a rigorous discipline, keep you on rails, take you through a process. That's what feature dev is all about. That's what we're going to use.

It's something which anthropic themselves use internally for their own software development. So it must be good. It sounds like I was saying that as a joke.

It's like, so it must be good. But no, it really must be good if anthropic uses it themselves. So we select it and then press Enter to look at it, comprehensive feature development workflow with specialized agents for co-based exploration, architecture design and quality review.

I know we haven't yet talked about having specialized agents, but I think you probably guessed what it's all about. And now if you look down below, we can choose to install just for you, have the scoped just for this user, for all collaborators on this repo, have project scope, and that is what we want. We want project scope, and so we select this, and I press enter, and now it has been installed, and you can see it just created a.claud file right there.

We have everything here. We are ready to be using a disciplined development process. But just before we get started, just some final housekeeping, we've now created this.cloord folder that got created for us, which has turned on this plugin for all people in this repo.

So we've got something to check in, and we might as well take this opportunity to create some other useful, or another useful file for our repo, which would be a.getignore file, which is an important one to have. So we'll get Cloud to do all that for us. I'm going to say please create a boilerplate.getignore for this new project for Fast API, next JS, web app development, and then commit and push to GitHub.

All of that, all of that will let it do its thing. It shouldn't need to use any plugins for that. This is just about doing some files.

There we go. We can see it's made a git ignore file. We will make its edits and do more edits.

And hopefully it is now going to run. It is doing a git status. It's committing.

And it's doing a git push. And it's doing a git pull because we merged the PR that needs to be done. It's doing all that for us.

It's handling all the git stuff for us. And it's all been done. Okay, that sounds exciting.

Let's see if this actually worked. We'll go over to GitHub now. And we can see here we are in GitHub.

Sure enough, we've got ourselves set up with the full the new readme that says we're going to complete it in a week.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

We say, yes, I trust the authors. Here we go. We are in here.

## Practical tips

- And this time it's for GitHub. We want to connect to GitHub using GitHub's famous remote MCP server using the token that we just created and that you're taking great care to preserve exactly as is. Now you may wonder why are we using MCP servers directly like this when I just told you that the best place to start is with plugins.
- And the reason is because first of all, these are two very famous MCP servers, Jura and GitHub that are very well known, very powerful and highly used in the community. And secondly, because they have these very particular authorization techniques and to do it, to go through that proper process, it is best to go directly through the MCP server. And that's why we're doing it that go through that proper process, it is best to go directly through the mcp server and that's why we're doing it that way.
- But wait, there's an issue under issues it says one let's go and check this out update read me let's look at it the read me needs to be updated to reflect the current state of the project there we go so very nice we've just used cloud code to connect to github and raise an issue okay well let's just take it one step further please update the read me to reflect that the project is in progress and will be completed in one week. Then raise a PR for this to be merged. I don't know if we have enough permissions for this, let's see what happens.
- I don't know why it's called number two, but experts will probably tell me why it's not number one, I mean. But here we go, it's got the summary, add status section to read me, indicated the progress in progress, generated with cloud code, it's put in here, which is really nice that it adds in that attribution. And then if we go to commits, we'll see that this PR includes the single commit to update read me with project status.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Well, let's hope we do it in a day. And we've got a dot git ignore, and that dot git ignore, if we click into it, it looks like it's got all sorts of sensible things including a.env, you should check that your version has that.env and very standard stuff for a JavaScript and Python project that has been successfully created. It's obviously on our local disk, it's also now been committed to GitHub as well. And so we are ready for prime time, we are ready to build a feature using a proper disciplined workflow, taking advantage of our integrations with both Atlassian JIRA for issues, for work for tasks and also GitHub for managing PRs.
