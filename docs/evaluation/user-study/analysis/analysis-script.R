########################################################################
# Results Evaluation and Visualization
########################################################################

# Delete current environment variables --------
rm(list = ls(all.names = TRUE))

# Load required packages -------
library(dplyr)
library(likert)

likertLevels <- c("1", "2", "3", "4", "5")
likertLabels <- c("strongly disagree (1)  ", "disagree (2)  ", "neutral (3)  ", "agree (4)  ", "strongly agree (5)  ")

# Read data ------------
data <- read.csv("docs/evaluation/user-study/analysis/participants.csv", sep = ",")

str(data)
summary(data)

# Median participant stats
data %>%
summarise(
  numParticipants = n(),
  mdYearsOfExperience = median(Years.of.Experience, na.rm = TRUE),
  mdYearsofAdrExperience = median(Years.of.ADR.Experience, na.rm = TRUE),
  percentageMadrUsage = sum(Has.Used.MADR == "yes") / n(),
  mdTaskDuration = median(Task.Duration.in.min, na.rm = TRUE),
  mdFunctionalSuitability = median(Functional.Suitability.Likert, na.rm = TRUE),
  mdUsability = median(Usability.Likert, na.rm = TRUE),
  mdFutureUsage = median(Future.Usage.Likert, na.rm = TRUE)
)

# Distribution of roles
data %>% select(Role) %>% table

# Likert plots --------

data %>%
  select(Functional.Suitability.Likert, Usability.Likert, Future.Usage.Likert) %>%

  mutate(Functional.Suitability.Likert = factor(Functional.Suitability.Likert, levels = likertLevels, ordered = TRUE, labels = likertLabels)) %>%
  rename("The functional suitability of the tool is fitting for its purpose." = Functional.Suitability.Likert) %>%

  mutate(Usability.Likert = factor(Usability.Likert, levels = likertLevels, ordered = TRUE, labels = likertLabels)) %>%
  rename("The usability of the tool allows its convenient usage." = Usability.Likert) %>%

  mutate(Future.Usage.Likert = factor(Future.Usage.Likert, levels = likertLevels, ordered = TRUE, labels = likertLabels)) %>%
  rename("It is likely that I will use the tool in the future." = Future.Usage.Likert) %>%

  likert() %>%
  plot(type = "bar", text.size = 4.5, wrap = 30) +
  theme(
    text = element_text(size = 16, face = "bold"),
    legend.title = element_text(size = 0, color = "white"),
    legend.text = element_text(size = 12),
    legend.position = "bottom"
  )
