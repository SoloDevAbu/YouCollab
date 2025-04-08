export const howItWorksSteps = [
    {
      title: "Account Creation & Onboarding",
      items: [
        {
          label: "Sign Up & Role Assignment:",
          points: [
            "YouTubers and Editors both create their accounts with a simple, secure signup process.",
            "During signup, users are assigned roles that determine their permissions and access throughout the platform."
          ]
        },
        {
          label: "Personalized Dashboards:",
          points: [
            "After logging in, each user sees a dedicated dashboard tailored to their role.",
            "YouTubers can manage channels, add editors, and review video uploads, while Editors can track their assigned projects and upload videos."
          ]
        }
      ]
    },
    {
      title: "YouTube Channel & Editor Management",
      items: [
        {
          label: "Linking Your YouTube Channel:",
          points: [
            "YouTubers can connect their YouTube channel with YouCollab via a secure OAuth2 integration.",
            "Once connected, all video uploads approved through the platform will automatically be published to the linked channel."
          ]
        },
        {
          label: "Adding Editors:",
          points: [
            "Within their dashboard, YouTubers can invite and add trusted Editors to collaborate on video projects.",
            "This role-based access ensures that only approved Editors can upload and manage content on behalf of the YouTuber."
          ]
        }
      ]
    },
    {
      title: "Video Upload & Collaboration Workflow",
      items: [
        {
          label: "Editor Video Upload:",
          points: [
            "Editors upload videos along with essential metadata such as title, description, and tags.",
            "Once an upload is initiated, the video is stored temporarily in a secure cloud storage."
          ]
        },
        {
          label: "Automated Email Notifications:",
          points: [
            "As soon as a video is uploaded, an email is sent to the corresponding YouTuber.",
            "The email displays a preview of the video along with its metadata and provides clear options to Confirm or Reject the video."
          ]
        }
      ]
    },
    {
      title: "Video Approval Process",
      items: [
        {
          label: "YouTuber Review:",
          points: [
            "YouTubers can review pending videos via email or directly through their dashboard.",
            "During review, they can modify the video metadata if necessary before final approval."
          ]
        },
        {
          label: "Approval or Rejection:",
          points: [
            "On confirmation, the video is first uploaded to YouTube via the YouTube Data API.",
            "Whether approved or rejected, the video is automatically removed from cloud storage to optimize resource use."
          ]
        },
        {
          label: "Status Tracking:",
          points: [
            "Both Editors and YouTubers can track video status with categories: Pending, All Uploads, Confirmed, and Rejected."
          ]
        }
      ]
    },
    {
      title: "Final Video Publication & Analytics",
      items: [
        {
          label: "Seamless Publication:",
          points: [
            "Once confirmed, the video is published directly to the YouTube channel, ensuring a smooth transition from editing to live content."
          ]
        },
        {
          label: "Performance & Analytics:",
          points: [
            "The platform offers insights into video performance and collaboration efficiency, helping creators optimize their workflow."
          ]
        }
      ]
    }
  ];
  