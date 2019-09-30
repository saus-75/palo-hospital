Install Dependencies:
```
yarn install
```

Start Server:

```
yarn serve
```

Start Client:

```
yarn client
```

Assumptions:
- A patient's waitTime is calculated by adding its severity rating plus all severity above it by `processTime * patientCount`
e.g. severity rating = 3, means waitTime will be `(3'sprocessTime * 3'spatientCount + 4's processTime * 4's patientCount`
- Also assuming the user doesn't care about distance to the hospital but only the waitTime of the hospital.
- Hospital Overview's wait time column shows the Max wait time if a patient's severity = 0
