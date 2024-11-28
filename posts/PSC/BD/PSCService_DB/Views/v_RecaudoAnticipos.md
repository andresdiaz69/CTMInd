# View: v_RecaudoAnticipos

## Usa los objetos:
- [[spiga_AnticiposClientesPendientes]]
- [[vw_Centros_Marca]]

```sql
create view v_RecaudoAnticipos as
select Año,mes,dia,empresa,marca,valor = sum(diferencia)
from(
		select distinct r.Empresa,u.marca,Año=year(r.FechaAlta),Mes=month(r.FechaAlta),dia=day(r.FechaAlta),Diferencia
		from spiga_AnticiposClientesPendientes			r
		left join [DBMLC_0190].dbo.[vw_Centros_Marca]	u	on	r.CodCentro = u.CodigoCentro 
		--where r.Ano_Periodo=2020
		--and r.Mes_Periodo = 6
) a group by Año,mes,dia,empresa,marca
```
