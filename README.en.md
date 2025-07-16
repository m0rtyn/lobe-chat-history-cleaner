# LobeChat History Processor

This project provides a Node.js tool to process and convert chat history exported from LobeChat into a cleaned-up JSON file and a formatted Markdown document.

---

## Documentation (English)

### Purpose

This script is designed to take a raw LobeChat JSON export and convert it into two user-friendly formats:
1.  A **lightweight, cleaned JSON file** containing only essential message data.
2.  A **structured Markdown file**, perfect for reading, archiving, or further processing.

### Project Structure

The tool consists of three files that work together:

-   `process-chat-history.js`: This is the **main script** you will run. It orchestrates the entire process by calling the other two modules in sequence.
-   `clean-history.js`: A module responsible for reading the raw export, extracting and cleaning the message data, and sorting the messages by creation date.
-   `to-markdown.js`: A module that takes the cleaned data and converts it into a readable Markdown format.

### How to Use

1.  **Prerequisites**: Ensure you have Node.js installed on your system.
2.  **Setup**: Place all three scripts (`process-chat-history.js`, `clean-history.js`, `to-markdown.js`) and your LobeChat export file (e.g., `lobe-export.json`) in the same directory.
3.  **Execution**: Open your terminal in that directory and run the main script, passing the name of your export file as an argument:

    ```bash
    node process-chat-history.js lobe-export.json
    ```

### Output Files

Running the script will generate two new files:

1.  **Cleaned JSON**: `lobe-export-cleaned.json`
    -   Contains a structured list of messages with only the `content`, `role`, `createdAt`, and `updatedAt` fields.
    -   Messages are sorted chronologically.

2.  **Markdown Document**: `memory_lobe-export-cleaned.md`
    -   Presents the dialogue in a clean, readable format.
    -   Each message is formatted as follows:
        ```md
        **{Name}:**
        {Message content}

        ```
        Where `{Name}` is `Martyn` for the `user` role and `Ygrek` for the `assistant` role.
