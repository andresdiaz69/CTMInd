# View: vw_cMandos_UtilidadTaller

## Usa los objetos:
- [[InformesArboles]]
- [[InformesDatosArbol]]
- [[InformesDatosPresentaciones]]
- [[InformesPresentacionesSedes]]

```sql

create VIEW [dbo].[vw_cMandos_UtilidadTaller]
AS
	select t3.Año,t3.Mes,t4.CodigoPresentacion,t3.CodigoSede,t3.Departamento,sum(isnull(t3.Saldo,0)*-1) Saldo
	from InformesComiteDB..InformesArboles t1 
				left join InformesComiteDB..InformesDatosArbol t2 ON t1.CodigoConcepto =t2.CodigoConcepto and t1.Balance = t2.Balance and t1.Empresa =t2.Empresa
				left join InformesComiteDB..InformesDatosPresentaciones t3 ON t2.Cuenta = t3.Cuenta
				left join InformesComiteDB..InformesPresentacionesSedes t4 ON t3.CodigoSede = t4.CodigoSede
	where t1.Balance = 17 AND t1.Nivel1 > 0 And t1.CodigoConcepto  in(307,308,309,310,319,320,321,322,331,332,333,334,275,276,277,279,280,345) and t3.Año is not null
	group by t3.Año,t3.Mes,t3.CodigoSede,t3.Departamento,t4.CodigoPresentacion


```
