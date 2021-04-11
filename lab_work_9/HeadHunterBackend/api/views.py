from django.shortcuts import render
from django.http.response import  HttpResponse, JsonResponse
from django.http.request import HttpRequest

from api.models import Company, Vacancy

# Create your views here.
def companies_list(request):
    companies = Company.objects.all()
    companies_json = [company.to_json() for company in companies]
    return JsonResponse(companies_json, safe=False)

def company_detail(request, id):
    try:
        company = Company.objects.get(id=id)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

    return JsonResponse(company.to_json())

def company_vacancies(request, id):
    try:
        vacancies = Vacancy.objects.filter(company = id)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

    vacancies_json = [vacancy.to_json() for vacancy in vacancies]
    return JsonResponse(vacancies_json, safe=False)

def vacancies_list(request):
    vacancies = Vacancy.objects.all()
    vacancies_json = [vacancy.to_json() for vacancy in vacancies]
    return JsonResponse(vacancies_json, safe=False)

def vacancy_detail(request, id):
    try:
        vacancy = Vacancy.objects.get(id=id)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

    return JsonResponse(vacancy.to_json())

def vacancies_top_ten(request):
    vacancies = Vacancy.objects.order_by("-salary")[:10]
    vacancies_json = [vacancy.to_json() for vacancy in vacancies]
    return JsonResponse(vacancies_json, safe=False)
