# View: v_MarginadorTallerJohnDeere

## Usa los objetos:
- [[spiga_InformaFacturacion]]
- [[UnidadDeNegocio]]

```sql
CREATE view [dbo].[v_MarginadorTallerJohnDeere] as
select distinct Año,  mes,  IdEmpresas, IdCentros,NombreCentro, IdMarcas CodMarcaFactura, NombreMarcas MarcaFactura, 
                CodMarcaNuevo, MarcaNueva, IdSecciones CodigoSeccionFactura ,  NombreSeccion NombreSeccionFactura,
                NumeroFactura,FechaFactura --IdCentros,NombreCentro,IdSecciones,NombreSeccion, Valor = sum(ManoObra) + sum(Repuestos)
  from (--Garantías
		 select Año,  mes,   IdEmpresas,NombreSeccion,IdMarcas,	 NombreMarcas, IdSecciones,IdCentros,NombreCentro,--IdSecciones,NombreSeccion,
		        CodMarcaNuevo = case when CodMarca not in (410,411,520) then 411 
			                    else Codmarca end,
		        MarcaNueva = case when marca not in ('Construccion','Agrícola','Wirtgen') then 'Construccion' 
			                 else marca end,
		        NumeroFactura, ManoObra = sum(ManoObra), Repuestos = sum(Repuestos),FechaFactura
		  from (select Año,  Mes,   Tipo, IdEmpresas, IdMarcas,  NombreMarcas,IdSecciones, NombreSeccion,IdCentros,NombreCentro,--, IdSecciones,NombreSeccion,IdCargoTipos, 
				       CodMarca = case when NombreSeccion like '%wirtgen%' then 520
							           when NombreSeccion like '%constru%' then 411
							           when NombreSeccion like '%agr%' then 410
							           else IdMarcas   end,
				       Marca = case when NombreSeccion like '%wirtgen%' then 'Wirtgen' 
							        when NombreSeccion like '%constru%' then 'Construccion'
							        when NombreSeccion like '%agr%' then 'Agrícola'
							        else nombremarcas end, FechaFactura,
				      IdGamas,      NombreGamas,	    HorasFacturadas,   ManoObra,     Repuestos,     NumeroFactura
				from (select Año,             Mes,                    Tipo,          IdEmpresas, 
					         IdCentros,       u.NombreCentro,         IdSecciones,   u.NombreSeccion,
							 IdCargoTipos,    IdMarcas,NombreMarcas,  IdGamas,       NombreGamas,
						     HorasFacturadas, Repuestos,              NumeroFactura, FechaFactura,
							 ManoObra=sum(ImporteMOAceptada+ImporteSUBAceptada+ImporteVARAceptada+ImportePINTAceptada)						
					    from (SELECT Año=year(FechaFactura),  Mes=month(fechafactura),  Tipo,          IdEmpresas, 
								     IdCentros,               IdSecciones,              IdCargoTipos,  IdMarcas,
									 NombreMarcas,            IdGamas,                  NombreGamas,   FechaFactura,
									 NumeroFactura=convert(varchar,SerieFactura) + '/' + convert(varchar,NumFactura) + '/' + convert(varchar,AñoFactura),
								     HorasFacturadas= (sum(isnull(HorasFacturadas,0))/100), ImporteMOAceptada=sum(isnull(ImporteMOAceptada,0)),ImporteSUBAceptada=sum(isnull(ImporteSUBAceptada,0)),
								     ImporteVARAceptada=sum(isnull(ImporteVARAceptada,0)),ImportePINTAceptada=sum(isnull(ImportePINTAceptada,0)),Repuestos=sum(ImporteMaterialAceptada)
								FROM [PSCService_DB].dbo.spiga_InformaFacturacion
							   WHERE (IdCentros IN (16, 18, 21, 22, 23, 25, 26, 29, 41, 43, 44, 46, 49, 65, 124, 153))   
								 and IdCargoTipos in ('G','GA')
								--(YEAR(FechaFactura) = 2021) T021/104717/2023
								--AND (MONTH(FechaFactura) = 9) 
								--and IdCentros = 25
								--and SerieFactura = 'T021'
								--and NUMFACTURA = 104717
							   group by year(FechaFactura),  month(fechafactura),    Tipo,           IdEmpresas, 
								        IdCentros,           IdSecciones,            FechaFactura,   IdCargoTipos,
										IdMarcas,            NombreMarcas,           IdGamas,        NombreGamas,
								        SerieFactura,        NumFactura,             AñoFactura,     FechaFactura
						      )a left join	[DBMLC_0190].dbo.UnidadDeNegocio u	on a.IdEmpresas  = u.CodEmpresa
																               and a.IdCentros   = u.CodCentro
																               and a.IdSecciones = u.CodSeccion	
					    group by Año,              Mes,                    Tipo,          IdEmpresas,
					             IdCentros,        u.NombreCentro,         IdSecciones,   u.NombreSeccion,
								 IdCargoTipos,     IdMarcas,NombreMarcas,  IdGamas,       NombreGamas,
						         HorasFacturadas,  Repuestos,              NumeroFactura, FechaFactura
				      )b
		     )c group by Año,mes,IdEmpresas,IdMarcas, NombreMarcas,CodMarca,marca,NumeroFactura,IdSecciones,NombreSeccion,
						 IdCentros,NombreCentro,FechaFactura--IdSecciones,NombreSeccion,
	   union all
  --Clientes / Internos
	  select Año,            mes,          IdEmpresas,NombreSeccion,IdMarcas, NombreMarcas,IdSecciones,IdCentros,NombreCentro,--,IdSecciones,NombreSeccion,
		     CodMarca = case when CodMarca not in (410,411,520) then 411 
			                 else Codmarca end,
		     marca= case when marca not in ('Construccion','Agrícola','Wirtgen') then 'Construccion'  
			                 else marca end, 
		     NumeroFactura,  ManoObra = sum(ManoObra), Repuestos = sum(Repuestos),FechaFactura
		from (select Año,Mes,  Tipo,     IdEmpresas, IdMarcas, NombreMarcas, NombreSeccion,IdSecciones,IdCentros,NombreCentro,-- IdSecciones,NombreSeccion,IdCargoTipos, 
				     CodMarca = case when NombreSeccion like '%wirtgen%' then 520
							         when NombreSeccion like '%constru%' then 411
							         when NombreSeccion like '%agr%' then 410							        
							         else 411 end,
				     Marca  = case when NombreSeccion like '%wirtgen%' then 'Wirtgen' 
							       when NombreSeccion like '%constru%' then 'Construccion'
							       when NombreSeccion like '%agr%'     then 'Agrícola'	
							       else 'forestal'	end,FechaFactura,
				     IdGamas,          NombreGamas, NumeroFactura,     HorasFacturadas,  ManoObra,    Repuestos
				from (select Año,          Mes,              Tipo,           IdEmpresas, 
				             IdCentros,    u.NombreCentro,   IdSecciones,    u.NombreSeccion,
							 IdCargoTipos, IdMarcas,         NombreMarcas,   IdGamas,
							 NombreGamas,  HorasFacturadas,  NumeroFactura,  ManoObra=sum((ImporteMOBruto-DescuentoMO)+(ImporteSUBBruto-DescuentoSUB)+(ImporteVARBruto-DescuentoVAR)+(ImportePINTBruto-DescuentoPINT)),
						     Repuestos=sum((ImporteMaterialBruto-DescuentoMaterial)),FechaFactura
						from (SELECT Año=year(FechaFactura),   Mes=month(fechafactura),  Tipo,         IdEmpresas,  
						             IdCentros,                IdSecciones,				 IdCargoTipos, IdMarcas,  
									 NombreMarcas,  		   IdGamas,                  NombreGamas,  FechaFactura,
							         NumeroFactura   =convert(varchar,SerieFactura) + '/' + convert(varchar,NumFactura) + '/' + convert(varchar,AñoFactura),
							         HorasFacturadas =(sum(isnull(HorasFacturadas,0))/100),ImporteMOBruto=sum(isnull(ImporteMOBruto,0)), 
							         DescuentoMO     =sum(isnull(DescuentoMO,0)), ImporteSUBBruto=sum(isnull(ImporteSUBBruto,0)), DescuentoSUB=sum(isnull(DescuentoSUB,0)),
							         ImporteVARBruto =sum(isnull(ImporteVARBruto,0)),DescuentoVAR=sum(isnull(DescuentoVAR,0)),ImportePINTBruto=sum(isnull(ImportePINTBruto,0)), 
							         DescuentoPINT   =sum(isnull(DescuentoPINT,0)),ImporteMaterialBruto=sum(isnull(ImporteMaterialBruto,0)), DescuentoMaterial=sum(isnull(DescuentoMaterial,0))
							    FROM [PSCService_DB].dbo.spiga_InformaFacturacion
							   WHERE IdCentros IN (16, 18, 21, 22, 23, 25, 26, 29, 41, 43, 44, 46, 49, 65, 124, 153)
							     and IdCargoTipos in ('C','I')
							    --and year(FechaFactura) = 2022  T021/104717/2023
							    --and month(FechaFactura) = 9
							    --and SerieFactura = 'T021'
							   --and NUMFACTURA = 104717
							   group by year(FechaFactura),  month(fechafactura),  Tipo,           IdEmpresas,
							            IdCentros,           IdSecciones,          FechaFactura,   IdCargoTipos, 
										IdMarcas,            NombreMarcas,         IdGamas,        NombreGamas,
							            SerieFactura,        NumFactura,           AñoFactura,     FechaFactura
		                       )a left join	[DBMLC_0190].dbo.UnidadDeNegocio u	on a.IdEmpresas = u.CodEmpresa
																               and a.IdCentros = u.CodCentro
																               and a.IdSecciones = u.CodSeccion	
						 group by Año,             Mes,                    Tipo,         IdEmpresas, 
						          IdCentros,       u.NombreCentro,         IdSecciones,  u.NombreSeccion,
								  IdCargoTipos,    IdMarcas,NombreMarcas,  IdGamas,      NombreGamas,
						          HorasFacturadas, NumeroFactura,          FechaFactura
				       )b
		       )c group by Año,mes,IdEmpresas, IdMarcas, NombreMarcas,CodMarca,marca,NumeroFactura,IdSecciones,NombreSeccion,
						   IdCentros,NombreCentro,FechaFactura--,IdSecciones,NombreSeccion,
	  
	 )d 
where Repuestos <> 0 --and
--and NumeroFactura like '%CRE/12251/2023%'
--and NumeroFactura like '%11502%' ---T025/100537/2022
 --and año=2024
--and mes=10
group by Año,mes,IdEmpresas, IdMarcas, NombreMarcas,CodMarcaNuevo,MarcaNueva,NumeroFactura,IdSecciones,NombreSeccion,
		 IdCentros,NombreCentro,FechaFactura--,IdSecciones,NombreSeccion,  IT4/2618/2022


```
