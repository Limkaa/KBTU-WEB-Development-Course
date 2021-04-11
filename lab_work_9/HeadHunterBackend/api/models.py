from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=300)
    description = models.TextField()
    city = models.CharField(max_length=300)
    address = models.TextField()

    class Meta:
        verbose_name_plural = "companies"

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'city': self.city,
            'address': self.address
        }

class Vacancy(models.Model):
    name = models.CharField(max_length=300)
    description = models.TextField()
    salary = models.FloatField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "vacancies"

    def __str__(self):
        return (f"{self.name} (Company: {self.company.name})")

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'salary': self.salary,
            'company': {
                'id': self.company.id,
                'name': self.company.name
            },
        }
