#jsonfmt
A simple JSON formatting command-line tool

`jsonfmt` can be used to pack or nicely format JSON files. Typical usages are:
- Packing a nicely formatted JSON file in to a single line, as a build step to
	reduce the size of the target file.
- Formatting a JSON string into a more readable version of itself, so it is
	easy to read and edit by human beings.

##Usage
`jsonfmt` reads from stdin and writes to stdout, so the `<` and `>` redirection characters
should be used to access the file system, for example:
	`jsonfmt < readable.json > packed.json`

By default, `jsonfmt` packs a readable JSON file into a single-line version of it. Size saving
is around 40-50%.

The following parameters can be used:
- **-u**, **--unpack**: unpacks the input into a human-readable JSON file,
	indenting nested structure using the tab character.
- **-d**, **--depth**: maximum nesting level to be used for unpacking. Applies only
	when the **-u** or **--unpack** flag is used. Structures nested beyond the specified
	level will be packed.
