# View: vw_GAC_Empleados_Por_Linea

## Usa los objetos:
- [[vw_GAC_Base_Empleados_Linea]]

```sql
CREATE VIEW [dbo].[vw_GAC_Empleados_Por_Linea] AS 
select bb.Ano, 
       bb.trimestre,
	   CodUnidadNegocio, 	    
	   bb.Linea,
       NumEmpleados promedio,
	   convert(decimal(10,1),(convert(decimal(10,2),NumEmpleados)/totalEmpleados)*100) porcentaje,
	   --case when LTRIM(RTRIM(octubre)) is null then ''	       
	   --     else sum(octubre) end ,
	   sum(mes1)mes1,
	   sum(mes2) mes2,
	   sum(mes3) mes3
  from (select Ano,     trimestre,	   CodUnidadNegocio, 	    
	           Linea,   NumEmpleados=CEILING(sum(convert(decimal(5,2),NumEmpleados))/3-0.5)	   
          from (SELECT Ano=Ano_Periodo, 
                       case when Mes_Periodo In (1,2,3)    then '1(ene-mar)'
			                when Mes_Periodo In (4,5,6)    then '2(abr-jun)'
			                when Mes_Periodo In (7,8,9)    then '3(jul-sep)'
			                when Mes_Periodo In (10,11,12) then '4(oct-dic)' 
				            else 'NA' end trimestre,  
	                   CodigoEmpresa,         CodUnidadNegocio, 
					   NombreEmpresa, 	          Linea=NombreUnidadNegocio,
					   NumEmpleados=count(CodigoEmpleado)
                  FROM vw_GAC_Base_Empleados_Linea A 
                 where NombreUnidadNegocio not in ('NEBULA')--,'Colisi n')
          -- and Ano_Periodo=2022
	    --   and mes_periodo  in(10,11,12)
                 GROUP BY NombreEmpresa, NombreUnidadNegocio, Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodUnidadNegocio )aa 
         GROUP BY Ano,  trimestre,      CodUnidadNegocio,      Linea)bb
inner join (select Ano, trimestre,	TotalEmpleados=sum(NumEmpleados)/3
              from (SELECT Ano=Ano_Periodo, 
                           case when Mes_Periodo In (1,2,3)    then '1(ene-mar)'
			                    when Mes_Periodo In (4,5,6)    then '2(abr-jun)'
			                    when Mes_Periodo In (7,8,9)    then '3(jul-sep)'
			                    when Mes_Periodo In (10,11,12) then '4(oct-dic)' 
				                else 'NA' end trimestre,           
                           NumEmpleados=count(CodigoEmpleado)
                      FROM vw_GAC_Base_Empleados_Linea A 
                      where NombreUnidadNegocio not in ('NEBULA')--,'Colisi n')         	   
                      GROUP BY NombreEmpresa, NombreUnidadNegocio, Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodUnidadNegocio )aa 
             GROUP BY Ano,  trimestre)cc on cc.Ano        = bb.Ano
					                    and cc.trimestre  = bb.trimestre
inner join (select trimestre, ano, Linea, mes1,mes2,mes3--,[abril],[mayo],[junio],[julio],[agosto],[septiembre],[octubre],[noviembre],[diciembre] 
              from (SELECT Ano=Ano_Periodo, 
                   case when Mes_Periodo In (1,2,3)    then '1(ene-mar)'
			            when Mes_Periodo In (4,5,6)    then '2(abr-jun)'
			            when Mes_Periodo In (7,8,9)    then '3(jul-sep)'
			            when Mes_Periodo In (10,11,12) then '4(oct-dic)' 
				        else 'NA' end trimestre, 
				   case when Mes_Periodo In (1,4,7,10)  then 'mes1'
				        when Mes_Periodo In (2,5,8,11)  then 'mes2'
						when Mes_Periodo In (3,6,9,12)  then 'mes3'			  
				        else 'NA' end Mes_Periodo,
	               CodigoEmpresa, 
	               CodUnidadNegocio, 
	               NombreEmpresa, 
	               Linea=NombreUnidadNegocio,
                   NumEmpleados=count(CodigoEmpleado)
              FROM vw_GAC_Base_Empleados_Linea A 
                  where NombreUnidadNegocio not in ('NEBULA','Colisi n')
				 -- and Ano_Periodo = 2022
               GROUP BY NombreEmpresa, NombreUnidadNegocio, Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodUnidadNegocio)ee
	    pivot (sum(numempleados) for mes_periodo in 
	(mes1,mes2,mes3--,[abril],[mayo],[junio],[julio],[agosto],[septiembre],[octubre],[noviembre],[diciembre]
	)) 
	as pivottable
       )dd on dd.Ano        = bb.Ano
		  and dd.trimestre  = bb.trimestre
		  and dd.linea      = bb.linea

--where bb.Ano=2023
--and bb.trimestre = '2(abr-jun)'
group by bb.Ano,  bb.trimestre, CodUnidadNegocio,  bb.Linea,   NumEmpleados,totalEmpleados
--order by 2,4
 

```
