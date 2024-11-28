# View: vw_presupuestoGacXLineaCentro

## Usa los objetos:
- [[Presupuestos_Definitivos]]

```sql
CREATE view vw_presupuestoGacXLineaCentro as
 --****************************
--Autor: Manuel Suarez
-- Date: 22/10/2024
--Descr: Create view para calcular el Gac de Ingresos desde el balance por trimestre.
--****************************
select a.Ano_periodo, a.trimestre, a.CodigoLinea,  CodigoCentro,  a.IdClase ,sum(valor)/ 3 Promedio , ((sum(valor))/3/total)*100 porcentaje 
  from (select Ano_Periodo,  case when Mes_Periodo in (1,2,3)    then 1
                                  when Mes_Periodo in (4,5,6)    then 2
   	   			                  when Mes_Periodo in (7,8,9)    then 3
   	   			                  when Mes_Periodo in (10,11,12) then 4  end trimestre, 
	           CodigoLinea,  CodigoCentro,IdClase,   valor
			  from Presupuestos_Definitivos
         where IdJerarquia = 1
	   ) a
 inner join (select Ano_Periodo,  case when Mes_Periodo in (1,2,3)    then 1
                                       when Mes_Periodo in (4,5,6)    then 2
   	   			                       when Mes_Periodo in (7,8,9)    then 3
   	   			                       when Mes_Periodo in (10,11,12) then 4  end trimestre, 
	                CodigoLinea,  IdClase, CASE WHEN SUM(Valor/3) = 0 THEN 1  -- Cambiar el valor a 1 si el total es 0
                                                ELSE SUM(Valor/3)  END total
               from Presupuestos_Definitivos   ---76961507975
              where IdJerarquia = 1
			  group by Ano_Periodo,  case when Mes_Periodo in (1,2,3)    then 1
                                          when Mes_Periodo in (4,5,6)    then 2
   	   			                          when Mes_Periodo in (7,8,9)    then 3
   	   			                          when Mes_Periodo in (10,11,12) then 4  end , 
	                CodigoLinea,  IdClase
            ) b on a.Ano_Periodo = b.Ano_Periodo
			   and a.CodigoLinea = b.CodigoLinea
			   and a.IdClase     = b.IdClase
			   and a.trimestre   = b.trimestre

	--where a.codigolinea =19
	--and a.IdClase = 1
	--and a.trimestre = 1
 group by  a.Ano_periodo, a.trimestre, a.CodigoLinea,  a.CodigoCentro, a.IdClase 	, total					



```
