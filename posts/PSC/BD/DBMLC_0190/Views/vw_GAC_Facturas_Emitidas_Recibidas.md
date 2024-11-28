# View: vw_GAC_Facturas_Emitidas_Recibidas

## Usa los objetos:
- [[UnidadDeNegocio]]
- [[vw_GAC_Facturas_Emitidas]]
- [[vw_GAC_Facturas_Recibidas]]

```sql

CREATE VIEW [dbo].[vw_GAC_Facturas_Emitidas_Recibidas] AS
--se esta sumando para JD un centro de la empresa bonaparte para validar 
SELECT  distinct a.Ano_Periodo,              a.trimestre,              NombreUnidadNegocio=nom1,  
		CodUnidadNegocio= cod1 ,             SUM(Emitidas) Emitidas,   SUM( Recibidas) Recibidas, 
		SumFacturas=sum(Emitidas+Recibidas), convert(decimal(10,1),(convert(decimal(10,2),sum(Emitidas+Recibidas))/totalfacturas)*100) porcentaje,totalfacturas 
  FROM 
       (SELECT distinct c.Ano_Periodo,   c.NombreEmpresa,               c.IdEmpresas,   
	           nom1 ,        
		       cod1 = case  when c.nom1 like '%be%'  then '15'
							else c.cod1 end,          Emitidas=ISNULL(a.NumFact,0),  Recibidas=ISNULL(b.FactRecibidas,0) ,
			   case when c.Mes_Periodo In (1,2,3)    then '1(ene-mar)'
			        when c.Mes_Periodo In (4,5,6)    then '2(abr-jun)'
			        when c.Mes_Periodo In (7,8,9)    then '3(jul-sep)'
			        when c.Mes_Periodo In (10,11,12) then '4(oct-dic)' 
					else 'NA' end trimestre
		  FROM (
				SELECT distinct Ano_Periodo,  Mes_Periodo,  NombreEmpresa,  IdEmpresas,   nom1=NombreUnidadNegocio,  cod1=CodUnidadNegocio-- ,tip=1
				  FROM vw_GAC_Facturas_Emitidas  
				 UNION ALL
				SELECT distinct Ano_Periodo,  Mes_Periodo,  NombreEmpresa,  pkfkempresas, nam1=NombreUnidadNegocio,  cod1=CodUnidadNegocio-- ,tip=2
				  FROM vw_GAC_Facturas_Recibidas  				 
               )c
		  LEFT JOIN vw_GAC_Facturas_Emitidas a  ON a.Ano_Periodo      =c.Ano_Periodo 
		                                       and a.Mes_Periodo      =c.Mes_Periodo 
											   and a.IdEmpresas       =c.IdEmpresas 
											   and a.CodUnidadNegocio =c.cod1
											  -- and c.tip = 1
		  LEFT JOIN vw_GAC_Facturas_Recibidas b ON b.Ano_Periodo      =c.Ano_Periodo 
		                                       and b.Mes_Periodo      =c.Mes_Periodo 
											   and b.pkfkempresas     =c.IdEmpresas 
											   and b.CodUnidadNegocio =c.cod1
											  -- and c.tip = 2
		  LEFT JOIN UnidadDeNegocio e ON e.CodUnidadNegocio=c.cod1
		  --where   a.Ano_Periodo=2023
		  --and a.Mes_Periodo in(4,5,6)

		 group by  c.Ano_Periodo,   c.NombreEmpresa,               c.IdEmpresas,   nom1,
	                    cod1 ,           a.NumFact, b.FactRecibidas, c.Mes_Periodo		
        )a
  inner join (SELECT distinct  Ano_Periodo,  trimestre,    totalFacturas=sum(Emitidas+Recibidas)
                     FROM 
						  (SELECT c.Ano_Periodo,   c.NombreEmpresa,               c.IdEmpresas,   
						          nom1 ,	                                     
			                      c.cod1 ,             
							      Emitidas =ISNULL(a.NumFact,0),  Recibidas=ISNULL(b.FactRecibidas,0) ,
			                      case when c.Mes_Periodo In (1,2,3) then '1(ene-mar)'
			                           when c.Mes_Periodo In (4,5,6)    then '2(abr-jun)'
			                           when c.Mes_Periodo In (7,8,9)    then '3(jul-sep)'
			                           when c.Mes_Periodo In (10,11,12) then '4(oct-dic)' 
					                   else 'NA' end trimestre
		                     FROM (
				                    SELECT Ano_Periodo,   Mes_Periodo,               NombreEmpresa,  
									       IdEmpresas,    nom1=NombreUnidadNegocio,  cod1=CodUnidadNegocio 
				                      FROM vw_GAC_Facturas_Emitidas  
				                     UNION ALL
				                    SELECT Ano_Periodo,   Mes_Periodo,               NombreEmpresa,  
				                           pkfkempresas,  nam2=NombreUnidadNegocio,  cod2=CodUnidadNegocio 
				                      FROM vw_GAC_Facturas_Recibidas  				 
                                  )c
		                     LEFT JOIN vw_GAC_Facturas_Emitidas a  ON a.Ano_Periodo      =c.Ano_Periodo 
		                                       and a.Mes_Periodo      =c.Mes_Periodo 
											   and a.IdEmpresas       =c.IdEmpresas 
											   and a.CodUnidadNegocio =c.cod1
		                     LEFT JOIN vw_GAC_Facturas_Recibidas b ON b.Ano_Periodo      =c.Ano_Periodo 
		                                       and b.Mes_Periodo      =c.Mes_Periodo 
											   and b.pkfkempresas     =c.IdEmpresas 
											   and b.CodUnidadNegocio =c.cod1
		                     LEFT JOIN UnidadDeNegocio e ON e.CodUnidadNegocio=c.cod1
		                    group by  c.Ano_Periodo,   c.NombreEmpresa,               c.IdEmpresas,   nom1,
	                                           cod1 ,           a.NumFact, b.FactRecibidas, c.Mes_Periodo		
                            )a
                      where nom1 not in ('NEBULA','Colisi n','USC (Unidad de Servicios compartidos)','FOMENTA')        
                      GROUP BY  Ano_Periodo, trimestre) tl on tl.Ano_Periodo = a.Ano_Periodo
					                                      and tl.trimestre   = a.trimestre
 where nom1 not in ('NEBULA','Colision','USC (Unidad de Servicios compartidos)','FOMENTA')
 --  and Sigla = 'FR'
  --and a.Ano_Periodo=2023
  --and a.trimestre = '2(abr-jun)'
 GROUP BY  a.Ano_Periodo, a.trimestre, nom1, cod1,  tl.totalfacturas

```
