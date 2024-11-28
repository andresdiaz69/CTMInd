# View: vw_Presupuestos_VehiculosPrecios

## Usa los objetos:
- [[Presupuestos_Combustible]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[VehiculosGamas]]
- [[VehiculosMarcas]]
- [[VehiculosModelos]]

```sql


CREATE view  [dbo].[vw_Presupuestos_VehiculosPrecios] as
--****************************
--Autor: Manuel Suarez
-- Date: 27/06/2024
--Descr: Create VW para proyecto presupuestos precios por gama, modelo tipo de vehiculo.
--****************************
--****************************
--Autor: Manuel Suarez
-- Date: 12/08/2024
--Descr: Alter VW se agrega campos  PrecioLista_Consumo y PrecioLista_Iva.
--****************************
--****************************
--Autor: Manuel Suarez
-- Date: 21/08/2024
--Descr: Alter VW se cambia el origen de datos .
--****************************
--****************************
--Autor: Manuel Suarez
-- Date: 28/08/2024
--Descr: Alter VW se ajustan los modelos para tomen el nombre estandar y no se repitan.
--****************************
--****************************
--Autor: Manuel Suarez
-- Date: 25/09/2024
--Descr: Alter VW se agrega un union con una nueva tabla para ingresar modelos presupuetos que no estan en Spiga+.
--****************************
--****************************
--Autor: Manuel Suarez
-- Date: 02/10/2024
--Descr: Alter VW se quita el union  y se agrupa donde se quitan los campos de modelo y se concatena un id. se cambio la tabla de combustible.
--****************************
select concat(a.CodigoMarca, a.CodigoGama,c.id_combustible) codigo,	     Marca,                 g.Gama,                   
       avg(PrecioListaAntesDeImpuestos) PrecioListaAntesDeImpuestos,    Clasificacion,    -- ModeloActivo,   -- tc.NombreClasificacion,	   
	   c.Combustible, --='Gas. Elec.' then 'Gasolina Electrico' 
	       -- else c.Combustible end Combustible,
	   AplicaPresupuesto = 1
  from (
		SELECT ROW_NUMBER()  OVER (PARTITION BY CodigoGama,   CodigoMarca,   CodigoModelo ORDER BY AnoModelo DESC) AS RowNum,
			   CodigoGama,   CodigoMarca,	    CodigoModelo, AnoModelo,     PrecioListaAntesDeImpuestos,
			   FechaModificacion
		  FROM DBMLC_0190..VehiculosModelos c
		 where modeloactivo=1
		 --and CodigoModelo ='KJ71D3RE'
		   and PrecioListaAntesDeImpuestos >0	
		 --and AnoModelo =year(getdate())+1
       )a
  left join DBMLC_0190..VehiculosMarcas m on m.CodigoMarca = a.CodigoMarca
  join (select PkCodModelo,  PkAnoModelo,  PkFkMarcas,  PkFkGamas, Nombre, 
               case when NombreClasificacion in ('Sedan' ,'AUTOMÓVIL','CAMIONETA','Campero','MICROBUS','CUADRICICLO','SIN CLASE')          then 'AUTOMOVIL'
			        when NombreClasificacion in ('ARAÑA','Chasis Cabinado','VOLQUETA') or NombreClasificacion like '%cami%' then 'TRACTO-CAMION'	
			        when NombreClasificacion like '%agr%' or NombreClasificacion like '%const%'                  then 'MAQUINARIA'
			        when NombreClasificacion is null then 'Sin Clasificacion'
			        else NombreClasificacion end Clasificacion,
		  	   FkCombustibleTipos, orden = ROW_NUMBER() over(partition by PkCodModelo order by PkAnoModelo desc, PkExtModelo)
		  from PSCService_DB..spiga_TipoClasificacionesVehiculos
		 where activo=1) tc  on tc.PkCodModelo = a.CodigoModelo 
							AND tc.PkAnoModelo = convert(varchar,a.AnoModelo) COLLATE Latin1_General_CI_AS
                            AND tc.PkFkMarcas  = a.CodigoMarca
							and tc.PkFkGamas   = a.CodigoGama
  left join Presupuestos_Combustible c on c.PkCombustibleTipos  = tc.FkCombustibleTipos 
  left join DBMLC_0190..VehiculosGamas g on g.CodigoMarca = a.CodigoMarca
							            and g.CodigoGama = a.CodigoGama
 where RowNum = 1
   and orden  = 1

group by a.CodigoMarca,	   Marca,    a.CodigoGama,    g.Gama,  id_combustible   ,Clasificacion  ,Combustible    
          


--SELECT FkMarcas,                                                           m.Marca,                               FkGamas,  
--       isnull(g.Gama,a.Gama)Gama,                                          FkCodModelo,                           tc.Nombre modelo,  
--	   avg(PrecioListaAntesDeImpuestos) PromPrecioListaAntesDeImpuestos, avg(PrecioListaFull) precioListaFull, --- avg(a.PrecioLista_Consumo) PrecioLista_Consumo,
--	 --  avg(a.PrecioLista_Iva) PrecioLista_Iva,                             a.ModeloActivo ,
--	   case when c.DescripcionTipoCombustible ='Gas. Elec.' then 'Gasolina Electrico' 
--	        else c.DescripcionTipoCombustible end Combustible,             NombreClasificacion,
--	   case when NombreClasificacion in ('ARAÑA','Chasis Cabinado') or NombreClasificacion like '%cami%' then 'TRACTO-CAMION'	        
--			when NombreClasificacion in ('Sedan' ,'AUTOMÓVIL','CAMIONETA','Campero','MICROBUS')          then 'AUTOMOVIL'
--			when NombreClasificacion like '%agr%' or NombreClasificacion like '%const%'                  then 'MAQUINARIA'
--			when NombreClasificacion is null then 'Sin Clasificacion'
--			else NombreClasificacion end ClasificacionPre
--  FROM DBMLC_0190.dbo.vw_VehiculosDisponibles_Spiga a
--  left join DBMLC_0190..VehiculosMarcas m on m.CodigoMarca = a.FkMarcas
--  left join DBMLC_0190..VehiculosGamas  g on g.CodigoMarca = a.FkMarcas
--							              and g.CodigoGama   = a.FkGamas
--  left join PSCService_DB..spiga_TipoClasificacionesVehiculos tc  ON tc.PkCodModelo COLLATE Latin1_General_CI_AS = a.FkCodModelo COLLATE Latin1_General_CI_AS
--                                                                   AND tc.PkAnoModelo  = a.FkAñoModelo COLLATE Latin1_General_CI_AS
--                                                                   AND tc.PkFkMarcas  = a.FkMarcas
--  left join(select distinct DescripcionTipoCombustible,IdCombustibleTipos 
--              from PSCService_DB..spiga_DatosDeVehiculos
--		   ) c on c.IdCombustibleTipos COLLATE Latin1_General_CI_AS = tc.FkCombustibleTipos COLLATE Latin1_General_CI_AS
-- where PrecioListaAntesDeImpuestos >0	
--   and ModeloActivo =1
--  -- and year(FechaModificacion )=year(getdate())-1
--  -- and CodigoGama=176--169--105
--  -- and a.CodigoMarca=19
-- group by FkGamas,            g.Gama,              a.Gama,  FkMarcas,  m.Marca ,  ModeloActivo,  FkCodModelo,Nombre,  DescripcionTipoCombustible,
--          FkCombustibleTipos, NombreClasificacion

```
