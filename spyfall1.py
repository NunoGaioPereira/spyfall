import random

num_players = 6

players = ['A', 'B', 'C', 'D', 'E', 'F']

class Location:
	def __init__(self, name_, professions_):
		self.name = name_
		self.professions = professions_

	def get_name(self):
		return self.name

	def get_locations(self):
		return self.professions

	def pretty_print(self):
		print("Location name: " + self.name)
		print("Professions: ")
		for p in self.professions:
			print(p)

	def print_professions(self):
		for p in self.professions:
			print(p)


def main():
	location_names = ['Beach', 'Space Station', 'Police Station']
	professions = [
		['Tourist', 'Lifeguard'],
		['Tourist', 'Cleaner', 'Astronaut', 'Mchanical Engineer', 'Pilot'],
		['Cop', 'Janitor', 'Prisoner', 'Lawyer'],
	]

	locations = []
	for location_name, professions_list in zip (location_names, professions):
		locations.append(Location(location_name, professions_list))

	for l in locations:
		l.pretty_print()

	print("#=Random setup=#")
	spy_index = random.randint(0, num_players - 1)
	print(spy_index)

	location_index = random.randint(0, len(locations) - 1)
	print(locations[location_index].print_professions())



if __name__ == '__main__':
	main()
