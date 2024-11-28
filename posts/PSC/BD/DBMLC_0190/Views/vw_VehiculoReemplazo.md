# View: vw_VehiculoReemplazo

## Usa los objetos:
- [[spiga_CotizacionesVN]]

```sql
CREATE view [dbo].[vw_VehiculoReemplazo] as
select IdEmpresas,IdCentros,IdTerceros,IdMarcas,NombreMarca,IdGamas,NombreGama,AñoModelo,Descripcion,vin,
MarcaReemplazo=rtrim(ltrim(MarcaReemplazo)),GamaReemplazo=rtrim(ltrim(GamaReemplazo)),AnoModeloReemplazo=rtrim(ltrim(AnoModuloReemplazo)),
ColorReemplazo=rtrim(ltrim(ColorReemplazo))
from(
	select IdEmpresas,IdCentros,IdTerceros,IdMarcas,NombreMarca,IdGamas,NombreGama,AñoModelo,Descripcion,vin,
	MarcaReemplazo,GamaReemplazo,
	AnoModuloReemplazo =replace(replace(replace(replace(replace(replace(replace(replace(AnoModuloReemplazo,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),':',''),'¨',''),
	ColorReemplazo=replace(replace(replace(replace(replace(replace(replace(replace(ColorReemplazo,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),':',''),'¨','')
	from(
		SELECT a.IdEmpresas,a.IdCentros,a.IdTerceros,a.IdMarcas,a.NombreMarca,a.IdGamas,a.NombreGama,a.AñoModelo,a.Descripcion,
		a.vin,
		MarcaReemplazo=replace(replace(replace(replace(replace(replace(replace(replace(a.Marca,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),':',''),'¨',''),
		GamaReemplazo=replace(replace(replace(replace(replace(replace(replace(a.Gama,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),':',''),
		AnoModuloReemplazo = modelo,
		ColorReemplazo = color
		FROM(
			select IdEmpresas,IdCentros,IdTerceros,IdMarcas,NombreMarca,idgamas,NombreGama,AñoModelo,Descripcion,VIN,ObservacionesInternas,
			marca=case when espaciomarca >0 then substring(marca,1,espaciomarca) else marca end,
			gama=case when espaciogama >0 then substring(gama,1,espaciogama) else gama end,
			modelo=case when espaciomodelo >0 then substring(modelo,1,espaciomodelo) else modelo end,
			color
			from(
				select IdEmpresas,IdCentros,IdTerceros,IdMarcas,NombreMarca,idgamas,NombreGama,AñoModelo,Descripcion,VIN,ObservacionesInternas,
				marca,espaciomarca=charindex(' ',marca),
				gama,espaciogama=charindex(' ' ,gama),
				modelo,espaciomodelo=charindex(' ',modelo),
				color
				from(
					SELECT IdEmpresas,IdCentros,IdTerceros,IdMarcas,NombreMarca,idgamas,NombreGama,AñoModelo,Descripcion,VIN,ObservacionesInternas,
					Marca=ltrim(replace(replace(replace(replace(substring(observacionesinternas,columnamarca,16),':',' '),';',' '),'gama',''),'¨',' ' )),
					Gama=ltrim(replace(replace(replace(replace(substring(observacionesinternas,columnagama,10),':',' '),'modelo',' '),'año',' '),'añ',' ')),
					Modelo=ltrim(replace(replace(replace(replace(replace(replace(substring(observacionesinternas,ColumnaModelo,11),':',' '),'año',' ' ),'col',' ' ),'colo',' ' ),'co',' ' ),'o',' ' )),
					Color=ltrim(replace(substring(observacionesinternas,ColumnaColor,15),':',' '))
					FROM(
						select v.IdEmpresas,v.IdCentros,v.IdTerceros,IdMarcas,v.NombreMarca,v.idgamas,v.NombreGama,v.AñoModelo,v.Descripcion,v.VIN,
						v.ObservacionesInternas,
						ColumnaMarca = CHARINDEX('Marca',v.ObservacionesInternas)+5,
						ColumnaGama = CHARINDEX('GAMA',v.ObservacionesInternas)+4,
						ColumnaModelo = CHARINDEX('MODELO',v.ObservacionesInternas)+6,
						ColumnaColor = CHARINDEX('COLOR',v.ObservacionesInternas)+6
						from [PSCService_DB].dbo.spiga_CotizacionesVN		v
						where v.ObservacionesInternas like '%marca%'
						and v.ObservacionesInternas like '%gama%'
						and v.ObservacionesInternas like '%modelo%'
						and v.ObservacionesInternas like '%color%'
			
					)r
				)s
			)t
		 )a
	)b
)c

```
